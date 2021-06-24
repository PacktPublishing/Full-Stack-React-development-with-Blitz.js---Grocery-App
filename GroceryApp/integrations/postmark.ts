const postmark = require("postmark")

const driver = () => {
  const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY!)

  return {
    send: (options) => client.sendEmail(options),
  }
}

export default driver
