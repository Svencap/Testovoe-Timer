import mongoose from "mongoose";
import express from "express";
// import UserModel from "./models/User.js";
import router from "./router.js";

import { createServer } from "http";
import { Server } from "socket.io";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const http = createServer(app);

const io = new Server(http);

app.use(express.json());
app.use("/api/v1", router);

const runApp = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("connection to Mongo"));

    io.on("connect", (socket) => {
      console.log({ socketId: socket.id });
    });
    http.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {}
};

runApp();
