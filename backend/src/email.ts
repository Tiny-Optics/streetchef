import nodemailer from 'nodemailer';

const smtpConfigured =
  Boolean(process.env.SMTP_HOST) &&
  Boolean(process.env.SMTP_USER) &&
  Boolean(process.env.SMTP_PASS);

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!smtpConfigured) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export function isSmtpConfigured(): boolean {
  return smtpConfigured;
}

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  const mailer = getTransporter();
  if (!mailer) {
    console.warn('SMTP not configured — password reset email not sent');
    return;
  }

  const from = process.env.EMAIL_FROM ?? process.env.SMTP_USER;

  await mailer.sendMail({
    from: `"StreetChef" <${from}>`,
    to,
    subject: 'Reset your StreetChef password',
    text: `Click the link to reset your password: ${resetUrl}`,
    html: `
      <p>You requested a password reset for your StreetChef account.</p>
      <p><a href="${resetUrl}">Reset your password</a></p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  });
}
