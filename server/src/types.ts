import { Request, Response } from "express";
import { Redis } from "ioredis";
import { CreateUserLoaderType } from "./utils/createUserLoader";

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
  createUserLoader: CreateUserLoaderType;
};
