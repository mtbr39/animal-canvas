import { Entity } from '../entity';
import { System } from './system';
import { PositionComponent, SizeComponent } from '../component';

export class RenderSystem extends System {
  private ctx: CanvasRenderingContext2D;
  entities: Entity[];
  scaler;

  constructor(ctx: CanvasRenderingContext2D, entities: Entity[], scaler: any) {
    super(entities);
    this.ctx = ctx;
    this.entities = entities;
    this.scaler = scaler;
  }

  public update() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = 'white';
    this.entities.forEach((entity) => {
      const position = entity.components.PositionComponent as PositionComponent;
      const size = entity.components.SizeComponent as SizeComponent;

      if (position && size) {
        this.rect(position.x, position.y, size.width, size.height);
      }
    });
  }

  rect(_x: number, _y: number, _w: number, _h: number) {
    const [x,y] = this.scaler.array([_x,_y]);
    const [w,h] = this.scaler.array2([_w,_h]);
    this.ctx.fillRect(x,y,w,h);
  }
}
