import Test from "./commands/test";

const param = process.argv[2];

const run = async (param: string) => {
  if (param == "test") {
    await Test();
  }
};

run(param);
