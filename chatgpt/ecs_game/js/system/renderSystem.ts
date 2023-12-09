import { Entity } from '../entity';
import { System } from './system';
import { PositionComponent, SizeComponent } from '../component';

export class RenderSystem extends System {
  private ctx: CanvasRenderingContext2D;
  entities: Entity[];

  constructor(ctx: CanvasRenderingContext2D, entities: Entity[]) {
    super(entities);
    this.ctx = ctx;
    this.entities = entities;
  }

  public update() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = 'white';
    this.entities.forEach((entity) => {
      const position = entity.components.PositionComponent as PositionComponent;
      const size = entity.components.SizeComponent as SizeComponent;

      if (position && size) {
        this.ctx.fillRect(position.x, position.y, size.width, size.height);
      }
    });
  }
}
