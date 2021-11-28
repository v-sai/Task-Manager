//imports
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

import taskRoute from "./routes/tasks.js";
import connetToDB from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

//middlewares
app.use(express.json());

//routes
app.use("/api/v1/tasks", taskRoute);
app.use(notFound);
app.use(errorHandler);

//listen
const port = process.env.PORT || 3000;
app.listen(port, async (req, res) => {
  try {
    await connetToDB(process.env.MONGO_URI);
    console.log(`TASK MANAGER API server is working at port ${port}`);
  } catch (err) {
    console.log(err);
  }
});
