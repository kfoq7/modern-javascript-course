import nodemailer from 'nodemailer'
import type { Veterinarian } from '../types'

export const registerEmail = async (data: Partial<Veterinarian>) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  })

  const { email, name, token } = data

  const info = await transport.sendMail({
    from: 'API - Administrator from Veterinarian',
    to: email,
    subject: 'Verify your account in APV',
    text: 'Vereify your account in APV',
    html: `
      <p>Hello: ${name}, verify your account in APV.</p>
      <p>Your account is almost verified, just click on the link below: </p>
      <a href="${process.env.FRONTEND_URL}/confirm/${token}">Verify account</a>

      <p>If you didn't create this account, just ignore this mail, thank you.</p>
    `
  })

  console.log(info)
}
