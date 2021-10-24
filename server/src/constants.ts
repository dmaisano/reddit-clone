export const __prod__ = process.env.NODE_ENV === `production`;

export const BASE_URL = !__prod__
  ? `http://localhost:3000` // nextjs dev server
  : process.env.BASE_URL;

export const COOKIE_NAME = `qid`;

export const FORGET_PASSWORD_PREFIX = `forget-password:`;

export const REGISTER_CONFIRMATION_PREFIX = `register-confirmation:`;

export const EMOJI_OR_WHITESPACE_REGEX =
  /^(\s*|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])*)*$/gi;

export const VALID_USERNAME_RE = /test_user[0-9]{1,6}/gi;
