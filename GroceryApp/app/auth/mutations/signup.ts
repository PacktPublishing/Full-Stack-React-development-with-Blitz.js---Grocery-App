import { resolver, SecurePassword, generateToken, hash256 } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
import { emailVerificationMailer } from "mailers/emailVerificationMailer"

const EMAIL_VERIFICATION_TOKEN_EXPIRATION_IN_HOURS = 4

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  // Set up email verification email
  const token = generateToken()
  const hashedToken = hash256(token)
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + EMAIL_VERIFICATION_TOKEN_EXPIRATION_IN_HOURS)

  await db.token.create({
    data: {
      user: { connect: { id: user.id } },
      type: "VERIFY_EMAIL",
      expiresAt,
      hashedToken,
      sentTo: email.toLowerCase().trim(),
    },
  })
  await emailVerificationMailer({ to: email.toLowerCase().trim(), token }).send()
  return user
})
