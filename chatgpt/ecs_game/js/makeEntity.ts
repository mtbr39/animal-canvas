import { createButton } from "./library/UIManager";
import { AnimalComponent, ColliderComponent, MapComponent, PathfindComponent, PlayerComponent, PointComponent, PositionComponent, ShapeComponent, SizeComponent, VelocityComponent } from "./component/component";
import { Entity } from "./entity";
import { MapGenerator } from "./library/mapGenerator";
import { convertPathToCenterPoints } from "./library/pathfind";

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

    entities.push(...createSurroundingBlocks(100,100,150,150, 2));

    const mapEntity = createMap();
    entities.push(mapEntity);
    const mapComponent = mapEntity.components.MapComponent as MapComponent;
    // entities.push(...createMapBlock(mapComponent.grid));

    const animalInitPoint = MapGenerator.convertPointToCenterPoint(mapComponent.centers[0], 10);
    entities.push(createAnimalEntity(animalInitPoint));

}

function createPlayerEntity() {
    const player = new Entity();
    player.components.PlayerComponent = new PlayerComponent();
    player.components.PositionComponent = new PositionComponent(50, 50);
    player.components.SizeComponent = new SizeComponent(20, 20);
    player.components.VelocityComponent = new VelocityComponent(0, 0);
    player.components.ColliderComponent = new ColliderComponent("player", ['block']);
    player.components.ShapeComponent = new ShapeComponent('square', 'black');
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

function createBlock(x: number, y:number, w:number=10, h:number=10) {
    const block = new Entity();
    block.components.PositionComponent = new PositionComponent(x, y);
    block.components.SizeComponent = new SizeComponent(w, h);
    block.components.ColliderComponent = new ColliderComponent("block", []);
    block.components.ShapeComponent = new ShapeComponent('square', 'black');
    return block;
}

function createSurroundingBlocks(x: number, y: number, width: number, height: number, borderWidth: number): Entity[] {
    const blocks: Entity[] = [];
    // const offset = borderWidth * 0.5;
    // 上辺のブロック
    blocks.push(createBlock(x, y, width, borderWidth));
    // 下辺のブロック
    blocks.push(createBlock(x, y + height - borderWidth, width, borderWidth));
    // 左辺のブロック
    blocks.push(createBlock(x, y, borderWidth, height));
    // 右辺のブロック
    blocks.push(createBlock(x + width - borderWidth, y, borderWidth, height));

    return blocks;
}

// 例えば、位置 (50, 50) に 100x100 の領域に、幅10のブロックで囲む場合
const surroundingBlocks = createSurroundingBlocks(50, 50, 100, 100, 10);



function createAnimalEntity(initPoint: Point) {
    const animal = new Entity();
    animal.components.PositionComponent = new PositionComponent(initPoint.x, initPoint.y);
    animal.components.SizeComponent = new SizeComponent(2, 2);
    animal.components.VelocityComponent = new VelocityComponent(0, 0);
    animal.components.ColliderComponent = new ColliderComponent("animal", ['block']);
    animal.components.ShapeComponent = new ShapeComponent('square', 'black');
    animal.components.AnimalComponent = new AnimalComponent();
    animal.components.PathfindComponent = new PathfindComponent();
    return animal;
}

function createMap() {
    const mapEntity = new Entity();
    let mapGrid, roomCenters;
    [mapGrid, roomCenters] = MapGenerator.run(40,40);
    mapEntity.components.MapComponent = new MapComponent(
        mapGrid as number[][],
        roomCenters as Point[]
    );
    return mapEntity;
}

function createMapBlock(map: number[][]) {


    const blocks = [];
    const mapCellGridSize = 10;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0) {
                blocks.push(createBlock(x*mapCellGridSize, y*mapCellGridSize));
            } else {
                
            }
        }
    }
    

    // for (let i=0; i<2; i++) {
    //     blocks.push(createBlock(i*40, 0));
    // }
    return blocks;
}

