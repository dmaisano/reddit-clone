// import dotenv from "dotenv";
// import fs from "fs";
// import nodemailer from "nodemailer";

// /**
//  * Parses .env file for test email credentials, creates test email account if not applicable
//  */
// export const emailConfig = async () => {
//   const { parsed, error } = dotenv.config();
//   let { EMAIL_USER, EMAIL_PASS, ...variables } = parsed || {};

//   if (error || !EMAIL_USER || !EMAIL_PASS) {
//     if (error) {
//       console.log(`emailConfig() error: `, error);
//     }

//     const { user, pass } = await nodemailer.createTestAccount();
//     EMAIL_USER = user;
//     EMAIL_PASS = pass;
//     console.log(`==== FETCHING NEW EMAIL CREDENTIALS ====`);
//   }

//   process.env.EMAIL_USER = EMAIL_USER;
//   process.env.EMAIL_PASS = EMAIL_PASS;

//   let file = ``;
//   file += `EMAIL_USER="${EMAIL_USER}"\n`;
//   file += `EMAIL_PASS="${EMAIL_PASS}"\n`;
//   for (let [key, value] of Object.entries(variables)) {
//     file += `${key}="${value}"\n`;
//   }

//   try {
//     fs.writeFileSync(`.env`, file);
//   } catch (err) {
//     console.log(`emailConfig(): `, err);
//   }

//   return {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   };
// };
