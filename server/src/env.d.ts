declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SECRET: string;
    CORS_ORIGIN: string;
    DOMAIN: string;
    PROJECT_ID: string;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    EMAIL_SERVICE: string;
    BASE_URL: string;
  }
}
