import { createButton } from "./UIManager";
import { ColliderComponent, PointComponent, PositionComponent, SizeComponent, VelocityComponent } from "./component";
import { Entity } from "./entity";

export function makeEntity(entities: Entity[], canvas: HTMLCanvasElement) {

    entities.push(createPlayerEntity());

    for (let i = 0; i < 5; i++) {
        entities.push(createPointEntity(canvas));
    }

    entities.push(
        createButton(100, 0, 120, 40, "testButton", function () {
            console.log("buttonAction");
        })
    );

    entities.push(...createMap());

}

function createPlayerEntity() {
    const player = new Entity();
    player.components.PositionComponent = new PositionComponent(50, 50);
    player.components.SizeComponent = new SizeComponent(20, 20);
    player.components.VelocityComponent = new VelocityComponent(0, 0);
    player.components.ColliderComponent = new ColliderComponent("player", ['block']);
    return player;
}

function createPointEntity(canvas: HTMLCanvasElement) {
    const point = new Entity();
    point.components.PositionComponent = new PositionComponent(Math.random() * (canvas.width - 30) + 15, Math.random() * (canvas.height - 30) + 15);
    point.components.SizeComponent = new SizeComponent(15, 15);
    point.components.PointComponent = new PointComponent();
    return point;
}

function createBlock(x: number, y:number) {
    const block = new Entity();
    block.components.PositionComponent = new PositionComponent(x, y);
    block.components.SizeComponent = new SizeComponent(40, 40);
    block.components.ColliderComponent = new ColliderComponent("block", []);
    return block;
}

function createMap() {
    const blocks = [];

    for (let i=0; i<2; i++) {
        blocks.push(createBlock(i*40, 0));
    }
    return blocks;
}

