import { Sequelize } from "sequelize-typescript";

import Config from "../config/config";

const db = new Sequelize({
  database: Config.DB_NAME,
  dialect: Config.DB_DIALECT as any,
  username: Config.DB_USER,
  password: Config.DB_PASSWORD,
  host: Config.DB_HOST,
  models: [__dirname + "/../app/models/*.*"],
  schema: "mv",
  // logging: false,
});

export default db;
