import mongoose from "mongoose";
import express from "express";
import UserModel from "./frontend/src/models/User.js";
import router from "./router.js";

import { createServer } from "http";
import { Server } from "socket.io";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

const http = createServer(app);
// { pingInterval: 80000, pingTimeout: 40000 }
const io = new Server(http, {
  pingTimeout: 60000,
});

app.use(express.json());
app.use("/api/v1", router);

const runApp = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("connection to Mongo"));

    io.on("connection", (socket) => {
      console.log({ socketId: socket.id });

      socket.on('join', async (username, callback) => {
        try {
          const updateUser = await UserModel.findOneAndUpdate({ name: username }, { participates: true }, { new: true });
          io.emit('join', updateUser);
          callback({ status: 'ok' });
        } catch (error) {
          callback({ status: 'error' });
        }
      })

      socket.on('leave', async (username, callback) => {
        try {
          const updateUser = await UserModel.findOneAndUpdate({ name: username }, { participates: false }, { new: true });
          console.log(updateUser);
          io.emit('leave', updateUser);
          callback({ status: 'ok' });
        } catch (error) {
          callback({ status: 'error' });
        }
      })

      socket.on('timer', (time) => {
        io.emit('timer', time);
      })  
    });



    http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {}
};

runApp();
