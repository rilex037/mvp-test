var cron = require("node-cron");

const runSchedules = () => {
  cron.schedule("*/1 * * * * *", () => {
    console.log("will execute every second");
  });
};
export default runSchedules;
