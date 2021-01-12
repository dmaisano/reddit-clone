import { MikroORM } from "@mikro-orm/core";
import path from "path";
import microConfig from "../src/mikro-orm.config";

(async () => {
  const orm = await MikroORM.init({
    ...microConfig,
    migrations: {
      path: path.join(__dirname, "../src/migrations/"), // path to the folder with migrations
      pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    },
  });

  const migrator = orm.getMigrator();
  await migrator.up(); // runs migrations up to the latest

  await orm.close(true);
})();
