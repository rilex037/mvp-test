var cron = require("node-cron");
import AddVotes from "./commands/addVotes";

const runSchedules = () => {
  cron
    .schedule("*/15 * * * * *", () => {
      AddVotes();
    })
    .start();
};

export default runSchedules;
