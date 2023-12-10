import { AnimalComponent, PositionComponent, VelocityComponent } from "../component";
import { Entity } from "../entity";
import { System } from "./system";


export class AnimalSystem extends System {
    constructor(entities: Entity[]) {
        super(entities);
    }

    update() {
        this.entities.forEach((entity) => {
            const animal = entity.components["AnimalComponent"] as AnimalComponent;
            const position = entity.components["PositionComponent"] as PositionComponent;
            const velocity = entity.components["VelocityComponent"] as VelocityComponent;

            if (animal && position && velocity) {
                animal.stateTime++;
                // console.log("statetimedebug", animal.stateTime);
                if (animal.stateTime > 60) {
                    animal.stateTime = 0;
                    animal.state = Math.random() > 0.5 ? 'walk' : 'idle';
                }
                if (animal.state == 'walk') {
                    velocity.speedX = 1;
                    velocity.speedY = 1;
                }
                if (animal.state == 'idle') {
                    velocity.speedX = 0;
                    velocity.speedY = 0;
                }
            }
        });
    }
}