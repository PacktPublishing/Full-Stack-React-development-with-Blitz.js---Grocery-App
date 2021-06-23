import sendgrid from "@sendgrid/mail"

const driver = () => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

  return sendgrid
}

export default driver
