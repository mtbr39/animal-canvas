import { Entity } from "./entity";
import { InputSystem } from "./system/inputSystem";
import { RenderSystem } from "./system/renderSystem";
import { MovementSystem, CollisionSystem } from "./system/system";
import {
    PositionComponent,
    SizeComponent,
    PointComponent,
    VelocityComponent,
} from "./component";
import { SystemManager } from "./system/systemManager";
import { UIManager, createButton } from "./UIManager";
import { UIRenderSystem } from "./system/UIRenderSystem";

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

    entities.push(
        createButton(100, 0, 120, 40, "testButton", function () {
            console.log("buttonAction");
        })
    );

    const inputSystem = new InputSystem(entities[0]);
    const uiManager = new UIManager(entities);
    const movementSystem = new MovementSystem(entities);
    const collisionSystem = new CollisionSystem(entities);
    const renderSystem = new RenderSystem(ctx, entities);
    const uiRenderSystem = new UIRenderSystem(ctx, entities);

    const systemManager = new SystemManager();
    systemManager.addSystems([
        movementSystem,
        collisionSystem,
        renderSystem,
        uiRenderSystem,
    ]);

    function gameLoop() {
        systemManager.updateSystems();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
};

init();
