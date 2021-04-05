import dotenv from "dotenv";
import fs from "fs";
import nodemailer from "nodemailer";
import { getTimeDifference } from "./time";

/**
 * Parses .env file for test email credentials, creates test email account if not applicable
 * @returns
 */
export const emailConfig = async () => {
  const { parsed, error } = dotenv.config();
  let { EMAIL_USER, EMAIL_PASS, EMAIL_TIMESTAMP, ...variables } = parsed || {};

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let timeStamp = isNaN(Date.parse(EMAIL_TIMESTAMP || ``))
    ? yesterday
    : new Date(Date.parse(EMAIL_TIMESTAMP || ``));

  // one or more hours has passed
  const isExpired =
    getTimeDifference(new Date(), timeStamp) * 1000 * 60 * 60 >= 1;

  let usingCached = false;
  if (error || !EMAIL_USER || !EMAIL_PASS || !EMAIL_TIMESTAMP || isExpired) {
    const { user, pass } = await nodemailer.createTestAccount();
    EMAIL_USER = user;
    EMAIL_PASS = pass;
    console.log(`==== FETCHING NEW EMAIL CREDENTIALS ====`);
  } else {
    usingCached = true;
  }

  process.env.EMAIL_USER = EMAIL_USER;
  process.env.EMAIL_PASS = EMAIL_PASS;
  process.env.EMAIL_TIMESTAMP = EMAIL_TIMESTAMP;

  let file = ``;
  file += `EMAIL_USER="${EMAIL_USER}"\n`;
  file += `EMAIL_PASS="${EMAIL_PASS}"\n`;
  file += `EMAIL_TIMESTAMP="${
    usingCached ? EMAIL_TIMESTAMP : new Date().toISOString()
  }"\n`;
  for (let [key, value] of Object.entries(variables)) {
    file += `${key}="${value}"\n`;
  }

  try {
    fs.writeFileSync(`.env`, file);
  } catch (err) {
    console.log(`emailConfig(): `, err);
  }

  return {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  };
};
