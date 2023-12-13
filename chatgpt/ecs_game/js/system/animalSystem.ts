import { AnimalComponent, Component, MapComponent, PathfindComponent, PositionComponent, VelocityComponent } from "../component";
import { Entity } from "../entity";
import { createPointEntity } from "../makeEntity";
import { findAndConvertPath } from "../pathfind";
import { System, UtilitySystem } from "./system";

export class AnimalSystem extends System {
    constructor(entities: Entity[]) {
        super(entities);
    }

    update() {
        let map: MapComponent;
        this.entities.forEach((entity) => {
            const mapComponent = entity.components.MapComponent as MapComponent;

            if (mapComponent) {
                map = mapComponent;
                return;
            }
        });

        this.entities.forEach((entity) => {
            const animal = entity.components["AnimalComponent"] as AnimalComponent;
            const position = entity.components["PositionComponent"] as PositionComponent;
            const velocity = entity.components["VelocityComponent"] as VelocityComponent;
            const pathfind = entity.components.PathfindComponent as PathfindComponent;

            if (animal && position && velocity) {
                // animal.stateTime++;
                // if (animal.stateTime > 60) {
                //     animal.stateTime = 0;
                //     animal.state = Math.random() > 0.5 ? 'walk' : 'idle';
                // }
                animal.state = "pathfindStart";
                switch (animal.state) {
                    case "walk":
                        velocity.speedX = 1;
                        velocity.speedY = 1;
                        break;
                    case "idle":
                        velocity.speedX = 0;
                        velocity.speedY = 0;
                        break;
                    case "pathfindStart":
                        // const start: Point = { x: 1, y: 1 };
                        // const goal: Point = { x: 37, y: 37 };
                        const start: Point = map.centers[0];
                        const goal: Point = map.centers[2];
                        const mapCellGridSize = 10;
                        const finalResult = findAndConvertPath(map.grid, start, goal, mapCellGridSize);
                        if (finalResult !== null) {
                            pathfind.path = finalResult!;

                            pathfind.path.forEach((path) => {
                                // this.entities.push(createPointEntity(path.x, path.y)) ;
                            });
                        }
                        animal.state = "pathfinding";
                        break;
                    default:
                        // Handle other states
                        break;
                }
            }
        });
    }
}
