import express from "express";
import db from "./config/db";
import v1 from "./routes/api";
import runSchedules from "./app/console/schedules";

const app = express();

app.use("/v1", v1);

runSchedules();

app.listen(3000, async () => {
  await db
    .authenticate({})
    .then(() => console.log("Connection has been established successfully."))
    .catch((error: Error) =>
      console.log("Unable to connect to the database:", error)
    );
  console.log("listening...");
});
