import { Entity } from "../entity";
import { ColliderComponent, PointComponent, PositionComponent, SizeComponent, VelocityComponent } from "../component";

export abstract class System {
    entities: Entity[];

    constructor(entities: Entity[]) {
        this.entities = entities;
    }

    abstract update(): void;
}

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

export class CollisionSystem extends System {
    constructor(entities: Entity[]) {
        super(entities);
    }

    update() {
        const playerPosition = this.entities[0].components["PositionComponent"] as PositionComponent;

        this.entities.slice(1).forEach((entity) => {
            const position = entity.components["PositionComponent"] as PositionComponent;
            const size = entity.components["SizeComponent"] as SizeComponent;
            const point = entity.components["PointComponent"] as PointComponent;

            if (
                playerPosition &&
                position &&
                size &&
                point &&
                playerPosition.x < position.x + size.width &&
                playerPosition.x + size.width > position.x &&
                playerPosition.y < position.y + size.height &&
                playerPosition.y + size.height > position.y
            ) {
                // 衝突した場合の処理
                this.entities.splice(this.entities.indexOf(entity), 1);
                console.log("衝突", this.entities);
            }
        });

        this.entities.forEach((entity, index) => {
            const presentIndex = index;
            const collider = entity.components["ColliderComponent"] as ColliderComponent;
            const position = entity.components["PositionComponent"] as PositionComponent;
            const size = entity.components["SizeComponent"] as SizeComponent;

            if (collider && position && size) {
                this.entities.forEach((otherEntity, otherIndex) => {
                    const otherCollider = otherEntity.components["ColliderComponent"] as ColliderComponent;
                    const otherPosition = otherEntity.components["PositionComponent"] as PositionComponent;
                    const otherSize = otherEntity.components["SizeComponent"] as SizeComponent;

                    if (otherCollider && otherPosition && otherSize && otherIndex != presentIndex) {
                        if (collider.collideWith.includes(otherCollider.layer)) {
                            if (
                                CollisionSystem.checkCollision(
                                    position.x,
                                    position.y,
                                    size.width,
                                    size.height,
                                    otherPosition.x,
                                    otherPosition.y,
                                    otherSize.width,
                                    otherSize.height
                                )
                            ) {
                                console.log("playerとblockが衝突 with");
                                const velocity = entity.components.VelocityComponent as VelocityComponent;
                                if (velocity) {
                                  position.x -= velocity.speedX;
                                  position.y -= velocity.speedY;
                                } else {
                                  console.log("衝突したがVelocityComponentを持たない", entity);
                                }
                            }
                        }
                    }
                });
            }
        });
    }

    static checkCollision(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) {
        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
    }
}
