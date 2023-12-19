import { Entity } from "../entity";
import { System } from "./system";
import { PositionComponent, SizeComponent } from "../component/component";
import { ButtonComponent, UIComponent } from "../component/UIComponent";

export class UIRenderSystem extends System {
    private ctx: CanvasRenderingContext2D;
    entities: Entity[];

    constructor(ctx: CanvasRenderingContext2D, entities: Entity[]) {
        super(entities);
        this.ctx = ctx;
        this.entities = entities;
    }

    public update() {
        this.entities.forEach((entity) => {
            const ui = entity.components["UIComponent"] as UIComponent;
            const button = entity.components["ButtonComponent"] as ButtonComponent;

            if (ui && button) {
                this.ctx.strokeStyle = "white";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(ui.x, ui.y, ui.width, ui.height);

                this.ctx.fillStyle = "white";
                this.ctx.font = "20px Arial";
                this.ctx.fillText(button.label, ui.x + 10, ui.y + 26);
            }
        });
    }
}
