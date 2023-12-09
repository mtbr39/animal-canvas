import { ButtonComponent, UIComponent } from "./component/UIComponent";
import { Entity } from "./entity";
import { System } from "./system/system";

// UIManagerはUIEntityを管理し、Canvas上で描画やイベントを処理する
export class UIManager extends System {
    constructor(entities: Entity[]) {
      super(entities);
      window.addEventListener('pointerup', this.handleClick.bind(this));
    }

    add(entity: Entity) {
        this.entities.push(entity);
    }

    handleClick(ev: PointerEvent) {
        const clientX = ev.clientX;
        const clientY = ev.clientY;
        this.entities.forEach((entity) => {
            const ui = entity.components.UIComponent as UIComponent;
            const button = entity.components.ButtonComponent as ButtonComponent;

            if (
                ui && button &&
                clientX < ui.x + ui.width &&
                clientX + ui.width > ui.x &&
                clientY < ui.y + ui.height &&
                clientY + ui.height > ui.y
            ) {
                button.action();
            }
        });
    }

    update() {

    }
}

// ボタンを作成する関数
export function createButton(x: number, y: number, width: number, height: number, label: string, action: () => void): Entity {
    const buttonUI = new Entity();
    buttonUI.addComponent("UIComponent", new UIComponent(x, y, width, height));
    buttonUI.addComponent("ButtonComponent", new ButtonComponent(label, action));
    return buttonUI;
}
