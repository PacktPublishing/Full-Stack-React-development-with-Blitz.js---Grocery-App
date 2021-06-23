import { resolver, hash256 } from "blitz"
import db from "db"
import { EmailVerification } from "../validations"
import followUpQueue from "app/api/followUpQueue"

export class EmailVerificationError extends Error {
  name = "EmailVerificationError"
  message = "Email verification link is invalid or it has expired."
}

export default resolver.pipe(resolver.zod(EmailVerification), async ({ token }, ctx) => {
  // 1. Try to find this token in the database
  const hashedToken = hash256(token)
  const possibleToken = await db.token.findFirst({
    where: { hashedToken, type: "VERIFY_EMAIL" },
    include: { user: true },
  })

  // 2. If token not found, error
  if (!possibleToken) {
    throw new EmailVerificationError()
  }
  const savedToken = possibleToken

  // 3. Delete token so it can't be used again
  await db.token.delete({ where: { id: savedToken.id } })

  // 4. If token has expired, error
  if (savedToken.expiresAt < new Date()) {
    throw new EmailVerificationError()
  }

  // 5. Since token is valid, now we can update the user's active status
  const user = await db.user.update({
    where: { id: savedToken.userId },
    data: { active: true },
  })

  await followUpQueue.enqueue(user.email, {
    delay: "3d",
  })

  return true
})
