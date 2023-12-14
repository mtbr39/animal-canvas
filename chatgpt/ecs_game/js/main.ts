import { Entity } from "./entity";
import { InputSystem } from "./system/inputSystem";
import { RenderSystem } from "./system/renderSystem";
import { SystemManager } from "./system/systemManager";
import { UIManager, createButton } from "./UIManager";
import { UIRenderSystem } from "./system/UIRenderSystem";
import { makeEntity } from "./makeEntity";
import { AnimalSystem } from "./system/animalSystem";
import { MovementSystem } from "./system/movementSystem";
import { CollisionSystem } from "./system/collisionSystem";
import { canvasScaler } from "./canvasScaler";

const init = () => {
    console.log("init 1214");

    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    
    let cssCanvasSize = {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
    let pixelRatioCanvasSize = {width: cssCanvasSize.width * window.devicePixelRatio, height: cssCanvasSize.height * window.devicePixelRatio};
    canvas.width = pixelRatioCanvasSize.width;
    canvas.height = pixelRatioCanvasSize.height;

    const canvasAreaRatio = 0.001 * 2.0;
    let gameToCanvasScale = Math.sqrt(canvas.width * canvas.height) * canvasAreaRatio; // canvasのピクセル面積に対して描写比率を決定

    const scaler = canvasScaler();
    scaler.setScale(gameToCanvasScale);
    scaler.setGameSize({width: canvas.width / gameToCanvasScale, height: canvas.height / gameToCanvasScale});

    function resizeCanvas() {
        canvas.style.width = `${cssCanvasSize.width}px`;
        canvas.style.height = `${cssCanvasSize.height}px`;
        canvas.width = pixelRatioCanvasSize.width;
        canvas.height = pixelRatioCanvasSize.height;
    };

    resizeCanvas();

    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        console.log("init error : ctx is null.");
        return;
    }

    const entities: Entity[] = [];

    makeEntity(entities, canvas);

    const inputSystem = new InputSystem(entities, scaler);
    const uiManager = new UIManager(entities);
    
    const movementSystem = new MovementSystem(entities);
    const collisionSystem = new CollisionSystem(entities);
    const animalSystem = new AnimalSystem(entities);

    const renderSystem = new RenderSystem(ctx, entities, scaler);
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
