import Migrate from "./commands/migrate";
import Seed from "./commands/seed";
import Test from "./commands/test";

const param = process.argv[2];

const run = async (param: string) => {
  if (param == "migrate") {
    Migrate();
  } else if (param == "seed") {
    Seed();
  } else if (param == "migrate_seed") {
    await Migrate();
    await Seed();
  } else if (param == "test") {
    await Test();
  }
};

run(param);
