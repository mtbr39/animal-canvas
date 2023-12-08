// global変数と関数を用いた愚直な実装 (ECSでの設計と比較用)

// Canvas要素を取得
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// プレイヤーの初期位置とサイズ
let player = {
  x: 50,
  y: 50,
  width: 20,
  height: 20,
  speed: 5,
};

// 青い矩形（ポイントアイテム）の配列
let points = [];

// ポイントの初期数
let score = 0;

// 青い矩形を追加する関数
function addPoint() {
  let point = {
    x: Math.random() * (canvas.width - 30) + 15,
    y: Math.random() * (canvas.height - 30) + 15,
    width: 15,
    height: 15,
  };
  points.push(point);
}

// ポイントを描画する関数
function drawPoints() {
  ctx.fillStyle = "blue";
  points.forEach((point) => {
    ctx.fillRect(point.x, point.y, point.width, point.height);
  });
}

// キーボードイベントを処理する関数
function handleKeydown(event) {
  switch (event.key) {
    case "w":
      player.y -= player.speed;
      break;
    case "a":
      player.x -= player.speed;
      break;
    case "s":
      player.y += player.speed;
      break;
    case "d":
      player.x += player.speed;
      break;
  }
}

// 衝突判定を行う関数
function checkCollision() {
  points.forEach((point, index) => {
    if (
      player.x < point.x + point.width &&
      player.x + player.width > point.x &&
      player.y < point.y + point.height &&
      player.y + player.height > point.y
    ) {
      points.splice(index, 1); // 衝突したポイントを削除
      score++; // スコアを増やす
    }
  });
}

// ゲームループ
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア

  // プレイヤーを描画
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  drawPoints(); // ポイントを描画
  checkCollision(); // 衝突判定

  // スコアを表示
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);

  requestAnimationFrame(gameLoop); // 次のフレームを要求
}

// 初期化
function init() {
  addPoint(); // 初期ポイントの追加

  // イベントリスナーを追加
  window.addEventListener("keydown", handleKeydown);

  gameLoop(); // ゲームループを開始
}

init(); // 初期化
