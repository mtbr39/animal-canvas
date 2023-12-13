import { Entity } from '../entity';
import { System } from './system';
import { MapComponent, PointComponent, PositionComponent, SizeComponent } from '../component';

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
    this.ctx.fillStyle = '#F3F3F5';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.entities.forEach((entity) => {
      const position = entity.components.PositionComponent as PositionComponent;
      const size = entity.components.SizeComponent as SizeComponent;
      const point = entity.components.PointComponent as PointComponent;

      if (position && size) {
        this.ctx.fillStyle = '#4D6653';
        // 1E1E1E
        if (point) this.ctx.fillStyle = 'gray';
        this.rect(position.x, position.y, size.width, size.height);
      }
    });

    this.entities.forEach((entity) => {
      const map = entity.components.MapComponent as MapComponent;

      if (map) {
        const mapCellGridSize = 10; // グリッドサイズ
        const rectSize = 10; // 矩形のサイズ
    
        for (let y = 0; y < map.grid.length; y++) {
            for (let x = 0; x < map.grid[y].length; x++) {
                if (map.grid[y][x] === 0) {
                    const rectX = x * mapCellGridSize; // x 座標の計算
                    const rectY = y * mapCellGridSize; // y 座標の計算
                    this.ctx.fillStyle = '#4D6653';
                    this.rect(rectX, rectY, mapCellGridSize, mapCellGridSize);
                }
            }
        }
    }
    });
  }

  rect(_x: number, _y: number, _w: number, _h: number) {
    const [x,y] = this.scaler.array([_x,_y]);
    const [w,h] = this.scaler.array2([_w,_h]);
    this.ctx.fillRect(x,y,w,h);
  }
}
