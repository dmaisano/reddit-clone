import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { __prod__ } from "../constants";
import { htmlFromTemplate, Template } from "./htmlFromTemplate";

type MailOptions = {
  to: string;
  subject: string;
  templateOption: Template;
  data?: any;
};

export async function sendEmail({
  to,
  subject,
  templateOption,
  data,
}: MailOptions) {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_SERVICE } = process.env;
  let transporter: Mail | undefined;

  try {
    const htmlTemplateOrError = await htmlFromTemplate(templateOption, data);

    if (htmlTemplateOrError instanceof Error) {
      console.log(`htmlTemplateOrError: ERROR`);
      throw htmlTemplateOrError;
    }

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
      html: htmlTemplateOrError,
    });

    return true;
  } catch (err) {
    return new Error(
      `=== EMAIL ERROR: Failed to send email to address "${to}" ===`,
    );
  } finally {
    transporter?.close();
  }
}
