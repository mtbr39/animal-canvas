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
import { makeEntity } from "./makeEntity";
import { AnimalSystem } from "./system/AnimalSystem";

const init = () => {
    console.log("init 1243");

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

    makeEntity(entities, canvas);

    const inputSystem = new InputSystem(entities[0]);
    const uiManager = new UIManager(entities);
    
    const movementSystem = new MovementSystem(entities);
    const collisionSystem = new CollisionSystem(entities);
    const animalSystem = new AnimalSystem(entities);

    const renderSystem = new RenderSystem(ctx, entities);
    const uiRenderSystem = new UIRenderSystem(ctx, entities);

    const systemManager = new SystemManager();
    systemManager.addSystems([
        movementSystem,
        collisionSystem,
        animalSystem,
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
