import migrate from "./commands/migrate";
import seed from "./commands/seed";

const param = process.argv[2];

const run = async (param: string) => {
  if (param == "migrate") {
    migrate();
  } else if (param == "seed") {
    seed();
  } else if (param == "migrate_seed") {
    await migrate();
    await seed();
  }
};

run(param);
