import nodemailer from "nodemailer"

const driver = () => {
  const port = Number(process.env.NODEMAILER_PORT)
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  })
  return {
    send: (options) => transport.sendMail(options),
  }
}

export default driver
