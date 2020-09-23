import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "../src/mikro-orm.config";

// Script to migrate up to the latest version
(async () => {
  const orm = await MikroORM.init(mikroConfig);

  const migrator = orm.getMigrator();
  await migrator.up();

  await orm.close(true);
})();
