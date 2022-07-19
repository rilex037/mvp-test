import express from "express";
import v1 from "./routes/api";
import runSchedules from "./app/console/schedules";

const app = express();

app.use("/v1", v1);

runSchedules();

app.listen(3000, async () => {
  console.log("listening...");
});
