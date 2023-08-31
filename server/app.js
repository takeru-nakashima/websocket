const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();

const PORT = process.env.WEBSOCKET_SERVER_PORT || 3003;
console.log(PORT);

app.get("/", (req, res, next) => {
  res.send("あああ")
})

let roomId = "";

io.on("connection", (socket) => {

  // ルーム機能
  socket.on("joinRoom", (message) => {
    console.log(message.roomId + "に入室しました。");
    roomId = message.roomId;
    // 入室（ルーム機能)
    socket.join(message.roomId);
  });

  // クライアントから入力されたメッセージをそのままチャットルームに返す
  socket.on("send", (payload) => {
    socket.to(roomId).emit("send", payload);
  });

  // disconnect
  socket.on("disconnect", () => {
    console.log("Connection closed");
  });
});

server.listen(PORT, () => {
  console.log("Listening...");
});
