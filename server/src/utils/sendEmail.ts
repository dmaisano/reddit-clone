import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { __prod__ } from "../constants";

export async function sendEmail({ to, subject, html }: Mail.Options) {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_SERVICE } = process.env;
  let transporter: Mail | undefined;

  try {
    transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      logger: !__prod__,
    });

    await transporter?.sendMail({
      from: `"Dom Maisano" <${EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    return err;
  } finally {
    transporter?.close();
  }
}
