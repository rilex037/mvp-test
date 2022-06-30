import db from "../../../config/db";
import fs from "fs";
import path from "path";

const Seed = async () => {
  console.log("seeding database...");
  const dir = path.resolve("./") + "/src/database";

  // Cults seeder
  await db.query(fs.readFileSync(dir + "/seeders/1.cuts.sql", "utf8"), {
    raw: true,
  });

  // Candidates seeder
  await db.query(fs.readFileSync(dir + "/seeders/2.candidates.sql", "utf8"), {
    raw: true,
  });
};

export default Seed;
