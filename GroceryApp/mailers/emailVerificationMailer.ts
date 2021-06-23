import previewEmail from "preview-email"

type EmailVerificationMailer = {
  to: string
  token: string
}

export function emailVerificationMailer({ to, token }: EmailVerificationMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const verifyUrl = `${origin}/verify-email?token=${token}`

  const msg = {
    from: "TODO@example.com",
    to,
    subject: "Verify your email",
    html: `
      <h1>Verify your email</h1>
      <h3>NOTE: You must set up a production email integration in mailers/emailVerificationMailer.ts</h3>

      <a href="${verifyUrl}">
        Click here to confirm your email
      </a>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        throw new Error("No production email implementation in mailers/emailVerificationMailer")
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
