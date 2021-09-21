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
        this.trace = null;
        this.nth = "init";
        this.isTracing = false;

        drawer.submitObject(this);
    }
    draw() {
        this.sprite.overlap(
            collectAreaManager.group,
            (mysprite, targetSprite) => {
                if (!this.isTracing) {
                    this.isTracing = true;
                    this.trace = collectAreaManager.getTrace(targetSprite);
                    this.nth = this.trace.pushChildAndGetNth();
                }
            }
        );
        if (this.trace) {
            this.sprite.velocity.x =
                (this.trace.getElderPosition(this.nth).x -
                    this.sprite.position.x) *
                0.02;
            this.sprite.velocity.y =
                (this.trace.getElderPosition(this.nth).y -
                    this.sprite.position.y) *
                0.02;

            this.trace.updateNthPosition(this.nth, this.sprite.position);
        }
    }
}
