declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    DOMAIN: string;
    PROJECT_ID: string;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    EMAIL_SERVICE: string;
  }
}