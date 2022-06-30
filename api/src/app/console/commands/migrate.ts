import db from "../../../config/db";
import fs from "fs";
import path from "path";

const migrate = async () => {
  console.log("running migration...");
  const dir = path.resolve("./") + "/src/database";

  // Drop and create
  await db.query("DROP SCHEMA IF EXISTS mv CASCADE;CREATE SCHEMA mv;", {
    raw: true,
  });

  // Cults table
  await db.query(fs.readFileSync(dir + "/migrations/1.cults.sql", "utf8"), {
    raw: true,
  });

  // Candidates table
  await db.query(
    fs.readFileSync(dir + "/migrations/2.candidates.sql", "utf8"),
    { raw: true }
  );
};

export default migrate;
