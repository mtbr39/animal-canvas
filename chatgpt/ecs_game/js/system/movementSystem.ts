import { Entity } from "../entity";
import { ColliderComponent, PathfindComponent, PositionComponent, SizeComponent, VelocityComponent } from "../component"; // 必要なコンポーネントをインポート
import { System } from "./system";

export class MovementSystem extends System {
    constructor(entities: Entity[]) {
        super(entities);
    }

    update() {
        this.entities.forEach((entity) => {
            const position = entity.components["PositionComponent"] as PositionComponent;
            const velocity = entity.components["VelocityComponent"] as VelocityComponent;

            if (position && velocity) {
                position.x += velocity.speedX;
                position.y += velocity.speedY;
            }
        });

        this.entities.forEach((entity) => {
            const pathfind = entity.components["PathfindComponent"] as PathfindComponent;
            const position = entity.components["PositionComponent"] as PositionComponent;
            const velocity = entity.components["VelocityComponent"] as VelocityComponent;

            if (pathfind && position && velocity) {
                const nextVelocity = MovementSystem.moveToNextPoint(pathfind, position, velocity);
                velocity.speedX = nextVelocity.speedX;
                velocity.speedY = nextVelocity.speedY;
            }
        });
    }

    static moveToNextPoint(pathfind: PathfindComponent, position: PositionComponent, velocity: VelocityComponent) {
        const proximityThreshold = 0.5;
        const currentPos = { x: position.x, y: position.y } as Point;

        if (pathfind.path.length === 0 || pathfind.achievement >= pathfind.path.length) {
            velocity.speedX = 0;
            velocity.speedY = 0;
            return { speedX: 0, speedY: 0 };
        }

        const nextPoint = pathfind.path[pathfind.achievement];

        const distanceToNextPoint = Math.sqrt(Math.pow(nextPoint.x - currentPos.x, 2) + Math.pow(nextPoint.y - currentPos.y, 2));

        if (distanceToNextPoint <= proximityThreshold) {
            console.log("到着", pathfind, pathfind.achievement);
            pathfind.achievement++;

            if (pathfind.achievement >= pathfind.path.length) {
                velocity.speedX = 0;
                velocity.speedY = 0;
                return { speedX: 0, speedY: 0 };
            }

            const updatedNextPoint = pathfind.path[pathfind.achievement];
            const speedX = updatedNextPoint.x - currentPos.x;
            const speedY = updatedNextPoint.y - currentPos.y;

            const magnitude = Math.sqrt(speedX * speedX + speedY * speedY);
            velocity.speedX = speedX / magnitude;
            velocity.speedY = speedY / magnitude;
            return { speedX: velocity.speedX, speedY: velocity.speedY };
        } else {
            const speedX = nextPoint.x - currentPos.x;
            const speedY = nextPoint.y - currentPos.y;

            const magnitude = Math.sqrt(speedX * speedX + speedY * speedY);
            velocity.speedX = speedX / magnitude;
            velocity.speedY = speedY / magnitude;
            return { speedX: velocity.speedX, speedY: velocity.speedY };
        }
    }
}
