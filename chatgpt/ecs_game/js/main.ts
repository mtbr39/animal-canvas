import { Entity } from "./entity";
import { InputSystem } from "./inputSystem";
import { RenderSystem } from "./renderSystem";
import { MovementSystem, CollisionSystem } from "./system";
import { PositionComponent, SizeComponent, PointComponent, VelocityComponent } from "./component";

const init = () => {

  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  if (ctx === null) {
    console.log("init error : ctx is null.");
    return;
  }
  
  const entities: Entity[] = [];
  
  // 初期化とエンティティの追加
  // ...
  
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
  
  const inputSystem = new InputSystem(entities[0]);
  const renderSystem = new RenderSystem(ctx, entities);

  function gameLoop() {
    if (!ctx) return;
  
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    movementSystem.update();
    collisionSystem.update();
    renderSystem.update();
  
    ctx.fillStyle = "white";
    entities.forEach((entity) => {
      const position = entity.components.PositionComponent as PositionComponent;
      const size = entity.components.SizeComponent as SizeComponent;
  
      if (position && size) {
        ctx.fillRect(position.x, position.y, size.width, size.height);
      }
    });
  
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();
}

init();
