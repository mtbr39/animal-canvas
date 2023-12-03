import Phaser from "phaser";
import io from "socket.io-client";

// socket.ioを組み込む
console.log("socket.ioを組み込む2");
const socket = io("http://localhost:3000");

// Phaserで画面に何か表示する
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

let playerRects = {}; // ユーザーごとの矩形を保持するオブジェクト

function preload() {
  // ここに画像やアセットの読み込みを記述
}

function create() {
  console.log("create2", socket);

  // ここからsocket.ioを使った処理を記述
  // socket.ioを使ってユーザーごとに矩形を用意
  socket.on("newPlayer", function (playerId) {
    console.log("on playerRects", playerId, playerRects);
    // const graphics = game.add.graphics();
    // graphics.lineStyle(2, 0xffffff, 1);
    playerRects[playerId] = graphics.strokeRect(100, 100, 200, 200);
    
  });

  socket.on("rectPosition", function (data) {
    console.log("on rectPosition", data);
    // 他のユーザーからの位置情報を受信して矩形の位置を更新
    playerRects[data.playerId].x = data.x;
    playerRects[data.playerId].y = data.y;
    console.log("### on # rectPosition", playerRects);
  });

  // 矩形を描画する
  const graphics = this.add.graphics();
  graphics.lineStyle(2, 0xffffff, 1);
  playerRects[socket.id] = graphics.strokeRect(100, 100, 200, 200); // 自分の矩形を保持

  // 新しいプレイヤーをサーバーに通知
  socket.emit("newPlayer", socket.id);
}

function update() {
  // 矩形の位置を更新
  const keys = this.input.keyboard.addKeys("W,S,A,D"); // WASDキーを追加

  if (keys.A.isDown) {
    playerRects[socket.id].x -= 2;
  } else if (keys.D.isDown) {
    playerRects[socket.id].x += 2;
  }
  if (keys.W.isDown) {
    playerRects[socket.id].y -= 2;
  } else if (keys.S.isDown) {
    playerRects[socket.id].y += 2;
  }

  // socket.ioを使って矩形の位置を共有
  let res = socket.emit("rectPosition", {
    playerId: socket.id,
    x: playerRects[socket.id].x,
    y: playerRects[socket.id].y,
  });
  // console.log("rectPosition emit res-debug", res);
}
