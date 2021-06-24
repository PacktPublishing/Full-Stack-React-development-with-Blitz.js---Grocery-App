import previewEmail from "preview-email"

type FollowUpMailer = {
  to: string
}

export function followUpMailer({ to }: FollowUpMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const loginUrl = `${origin}/login`

  const msg = {
    from: "TODO@example.com",
    to,
    subject: "How are you doing?",
    html: `
      <h1>Follow up email</h1>
      <h3>NOTE: You must set up a production email integration in mailers/followUpMailer.ts</h3>
      <p>Hi, it's been 3 days since you've joined us. How have you found your experience so far?</p>

      <a href="${loginUrl}">
        Click here to login
      </a>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        throw new Error("No production email implementation in mailers/followUpMailer")
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
