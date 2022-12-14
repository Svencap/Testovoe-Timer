import mongoose from "mongoose";
import express from "express";
import UserModel from "./frontend/src/models/User.js";
import router from "./router.js";
import corse from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import { createServer } from "http";
import { Server } from "socket.io";

import * as dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "*",
  },
});


app.use(corse());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use("/api/v1", router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
})


const runApp = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("connection to MongoDB"));

    io.on("connection", (socket) => {
      console.log({ socketId: socket.id });

      socket.on("join", async (username, callback) => {
        try {
          const updateUser = await UserModel.findOneAndUpdate(
            { name: username },
            { participates: true },
            { new: true }
          );
          io.emit("join", updateUser);
          callback({ status: "ok" });
        } catch (error) {
          callback({ status: "error" });
        }
      });

      socket.on("leave", async (username, callback) => {
        try {
          const updateUser = await UserModel.findOneAndUpdate(
            { name: username },
            { participates: false },
            { new: true }
          );
          io.emit("leave", updateUser);
          callback({ status: "ok" });
        } catch (error) {
          callback({ status: "error" });
        }
      });

      socket.on("timer", (time) => {
        io.emit("timer", time);
      });
    });
    http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {}
};

runApp();
