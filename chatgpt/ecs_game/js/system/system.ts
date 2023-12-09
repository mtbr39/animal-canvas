import { Entity } from '../entity';
import { PositionComponent, SizeComponent, VelocityComponent } from '../component';

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
    this.entities.forEach(entity => {
      const position = entity.components['PositionComponent'] as PositionComponent;
      const velocity = entity.components['VelocityComponent'] as VelocityComponent;

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
    const playerPosition = this.entities[0].components['PositionComponent'] as PositionComponent;

    this.entities.slice(1).forEach(entity => {
      const position = entity.components['PositionComponent'] as PositionComponent;
      const size = entity.components['SizeComponent'] as SizeComponent;

      if (
        playerPosition &&
        position &&
        size &&
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
  }
}
