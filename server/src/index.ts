import { MikroORM } from "@mikro-orm/core";
import path from "path";
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
};

main().catch((err) => {
  console.log(err);
});
