export const __prod__ = process.env.NODE_ENV === `production`;

export const BASE_URL = !__prod__
  ? `http://localhost:3000` // nextjs dev server
  : process.env.BASE_URL;

export const COOKIE_NAME = `qid`;

export const FORGET_PASSWORD_PREFIX = `forget-password:`;

export const REGISTER_CONFIRMATION_PREFIX = `register-confirmation:`;
