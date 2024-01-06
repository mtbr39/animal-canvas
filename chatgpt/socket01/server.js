import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// const app = express();
// app.use(cors({ origin: "http://localhost:8080" }));

const app = express();
app.use(cors()); // すべてのオリジンからのリクエストを許可する場合

app.use(express.static("dist"));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("newPlayer", (playerId) => {
    console.log("newPlayer");
    // 他のクライアントに新しいプレイヤーを通知
    socket.broadcast.emit("newPlayer", playerId);
  });

  socket.on("rectPosition", (data) => {
    socket.broadcast.emit("rectPosition", data);
  });
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(3000, () => {
  console.log("サーバーがポート3000で起動しました");
});
