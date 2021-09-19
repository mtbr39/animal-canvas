class Cargos {
    constructor() {
        this.group = new Group();
        this.cargos = [];
    }
    draw() {}
    onMousePressed() {
        let cargo = new Cargo({ x: mouseX, y: mouseY });
        this.group.add(cargo.sprite);
        this.cargos.push(cargo);
    }
}
class Cargo {
    constructor(options) {
        let x0 = options.x | 0;
        let y0 = options.y | 0;
        this.sprite = createSprite(x0, y0, 40, 40);
        this.sprite.shapeColor = color(200);
        // this.sprite.velocity.y = 4.0;
        this.nth = trace1.pushChildAndGetNth(); //todo : 付替え可能なTraceを所有させる
        drawer.submitObject(this);
    }
    draw() {
        this.sprite.velocity.x =
            (trace1.getElderPosition(this.nth).x - this.sprite.position.x) *
            0.02;
        this.sprite.velocity.y =
            (trace1.getElderPosition(this.nth).y - this.sprite.position.y) *
            0.02;

        trace1.updateNthPosition(this.nth, this.sprite.position);
    }
}
