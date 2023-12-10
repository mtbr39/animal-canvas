import { Entity } from "../entity";
import { ColliderComponent, PointComponent, PositionComponent, SizeComponent, VelocityComponent } from "../component";
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
    }
}