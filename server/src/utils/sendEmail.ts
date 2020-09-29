import nodemailer from "nodemailer";
import { EmailProps } from "../types";
import { devConsole } from "./devConsole";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(params: EmailProps) {
  const { to, subject, html } = params;

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount: nodemailer.TestAccount = {} as nodemailer.TestAccount;
  // testAccount = await nodemailer.createTestAccount();

  const user = testAccount.user ?? "w4jyhcv5srydvhne@ethereal.email";
  const pass = testAccount.pass ?? "mD32EC6pmnWCWjVN7Q";

  devConsole({ testAccount, user, pass });

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user, // generated ethereal user
      pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    // text, // plain text body
    html,
    // html: "<b>Hello world?</b>", // html body
  });

  devConsole("Message sent: %s", info.messageId);
  devConsole("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
