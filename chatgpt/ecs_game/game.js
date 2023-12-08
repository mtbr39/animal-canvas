// ECSフレームワークの実装
class Entity {
  constructor() {
    this.components = {};
  }
}

class Component {}

class PositionComponent extends Component {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}

class SizeComponent extends Component {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
}

class VelocityComponent extends Component {
  constructor(speedX, speedY) {
    super();
    this.speedX = speedX;
    this.speedY = speedY;
  }
}

class PointComponent extends Component {}

class System {
  constructor(entities) {
    this.entities = entities;
  }

  update() {}
}

class MovementSystem extends System {
  constructor(entities) {
    super(entities);
  }

  update() {
    this.entities.forEach((entity) => {
      const position = entity.components.PositionComponent;
      const velocity = entity.components.VelocityComponent;

      if (position && velocity) {
        position.x += velocity.speedX;
        position.y += velocity.speedY;
      }
    });
  }
}

class CollisionSystem extends System {
  constructor(entities) {
    super(entities);
  }

  update() {
    const playerPosition = this.entities[0].components.PositionComponent;

    this.entities.slice(1).forEach((entity) => {
      const position = entity.components.PositionComponent;
      const size = entity.components.SizeComponent;

      if (
        playerPosition &&
        position &&
        size &&
        playerPosition.x < position.x + size.width &&
        playerPosition.x + size.width > position.x &&
        playerPosition.y < position.y + size.height &&
        playerPosition.y + size.height > position.y
      ) {
        // Collision occurred
        this.entities.splice(this.entities.indexOf(entity), 1);
        console.log("衝突", this.entities);
        // Increment score or perform other actions on collision
      }
    });
  }
}

// Canvas要素を取得
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");

// ゲームの初期化と実行
const entities = [];

const player = new Entity();
player.components.PositionComponent = new PositionComponent(50, 50);
player.components.SizeComponent = new SizeComponent(20, 20);
player.components.VelocityComponent = new VelocityComponent(0, 0);
entities.push(player);

// 青い矩形を追加する関数
function addPointEntity() {
  const point = new Entity();
  point.components.PositionComponent = new PositionComponent(
    Math.random() * (canvas.width - 30) + 15,
    Math.random() * (canvas.height - 30) + 15
  );
  point.components.SizeComponent = new SizeComponent(15, 15);
  point.components.PointComponent = new PointComponent();
  entities.push(point);
}

for (let i = 0; i < 5; i++) {
  addPointEntity();
}

const movementSystem = new MovementSystem(entities);
const collisionSystem = new CollisionSystem(entities);

function handleKeydown(event) {
  const velocity = player.components.VelocityComponent;

  switch (event.key) {
    case "w":
      velocity.speedY = -5;
      break;
    case "a":
      velocity.speedX = -5;
      break;
    case "s":
      velocity.speedY = 5;
      break;
    case "d":
      velocity.speedX = 5;
      break;
  }
}

function handleKeyup(event) {
  const velocity = player.components.VelocityComponent;

  switch (event.key) {
    case "w":
    case "s":
      velocity.speedY = 0;
      break;
    case "a":
    case "d":
      velocity.speedX = 0;
      break;
  }
}

// イベントリスナーを追加
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);

function gameLoop() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  movementSystem.update();
  collisionSystem.update();

  ctx.fillStyle = "white";
  entities.forEach((entity) => {
    const position = entity.components.PositionComponent;
    const size = entity.components.SizeComponent;

    if (position && size) {
      ctx.fillRect(position.x, position.y, size.width, size.height);
    }
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();
