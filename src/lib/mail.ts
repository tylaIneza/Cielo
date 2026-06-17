import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Reset your Cielo Fashion password",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2 style="color:#c9a84c">Reset Your Password</h2>
        <p>Click the link below to reset your password. It expires in 1 hour.</p>
        <a href="${url}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#000;text-decoration:none;border-radius:4px;font-weight:600">
          Reset Password
        </a>
        <p style="color:#888;font-size:12px;margin-top:24px">If you did not request this, ignore this email.</p>
      </div>
    `,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Verify your Cielo Fashion email",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2 style="color:#c9a84c">Verify Your Email</h2>
        <p>Click the link below to verify your email address.</p>
        <a href="${url}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#000;text-decoration:none;border-radius:4px;font-weight:600">
          Verify Email
        </a>
      </div>
    `,
  });
}
