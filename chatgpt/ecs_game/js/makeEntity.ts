import { createButton } from "./UIManager";
import { AnimalComponent, ColliderComponent, MapComponent, PathfindComponent, PointComponent, PositionComponent, SizeComponent, VelocityComponent } from "./component";
import { Entity } from "./entity";

export function makeEntity(entities: Entity[], canvas: HTMLCanvasElement) {

    entities.push(createPlayerEntity());

    for (let i = 0; i < 5; i++) {
        entities.push(createRandomPointEntity(canvas));
    }

    entities.push(
        createButton(100, 0, 120, 40, "testButton", function () {
            console.log("buttonAction");
        })
    );

    entities.push(createAnimalEntity());

    entities.push(...createMap(entities));

}

function createPlayerEntity() {
    const player = new Entity();
    player.components.PositionComponent = new PositionComponent(50, 50);
    player.components.SizeComponent = new SizeComponent(20, 20);
    player.components.VelocityComponent = new VelocityComponent(0, 0);
    player.components.ColliderComponent = new ColliderComponent("player", ['block']);
    return player;
}

export function createRandomPointEntity(canvas: HTMLCanvasElement) {
    const point = new Entity();
    point.components.PositionComponent = new PositionComponent(Math.random() * (canvas.width - 30) + 15, Math.random() * (canvas.height - 30) + 15);
    point.components.SizeComponent = new SizeComponent(5, 5);
    point.components.PointComponent = new PointComponent();
    return point;
}

export function createPointEntity(_x: number, _y: number) {
    const point = new Entity();
    point.components.PositionComponent = new PositionComponent(_x, _y);
    point.components.SizeComponent = new SizeComponent(5, 5);
    point.components.PointComponent = new PointComponent();
    return point;
}

function createBlock(x: number, y:number) {
    const block = new Entity();
    block.components.PositionComponent = new PositionComponent(x, y);
    block.components.SizeComponent = new SizeComponent(10, 10);
    block.components.ColliderComponent = new ColliderComponent("block", []);
    return block;
}

function createAnimalEntity() {
    const animal = new Entity();
    animal.components.PositionComponent = new PositionComponent(50, 50);
    animal.components.SizeComponent = new SizeComponent(2, 2);
    animal.components.VelocityComponent = new VelocityComponent(0, 0);
    animal.components.ColliderComponent = new ColliderComponent("animal", ['block']);
    animal.components.AnimalComponent = new AnimalComponent();
    animal.components.PathfindComponent = new PathfindComponent();
    return animal;
}

function createMap(entities: Entity[]) {
    const mapEntity = new Entity();
    // mapEntity.components.MapComponent = new MapComponent(
    //     [
    //         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
    //         [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     ]
    // );
    mapEntity.components.MapComponent = new MapComponent(
        MapComponent.generateMap(40,40)
    );
    entities.push(mapEntity);

    const mapComponent = mapEntity.components.MapComponent as MapComponent;
    const map = mapComponent.grid;

    const blocks = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) {
                blocks.push(createBlock(x*10, y*10));
            } else {
                
            }
        }
    }
    

    // for (let i=0; i<2; i++) {
    //     blocks.push(createBlock(i*40, 0));
    // }
    return blocks;
}

