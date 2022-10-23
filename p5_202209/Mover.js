class Mover {
    constructor() {
        this.sprite = createSprite(width / 2, height / 2, 40, 40);
        this.sprite.color = color(0,0,255,0);

        this.vision = new Vision({ x: this.sprite.x, y: this.sprite.y, offsetX: this.sprite.width});
        this.vision.overlaps()

        this.sprite.addSpeed(0.2, this.sprite.rotation);
        
        drawer.submitObject(this);
    }
    draw() {
        this.vision.fixPosition(this.sprite.position.x, this.sprite.position.y);

    }
}

class Vision {
    constructor(options) {
        let x0 = options.x | 0;
        let y0 = options.y | 0;
        this.offsetX = options.offsetX | 0;
        this.offsetY = options.offsetY | 0;
        this.sprite = new Sprite(x0 + this.offsetX, y0 + this.offsetY, 200, 160, 'static');
        this.sprite.overlaps(allSprites);
        this.sprite.color = color(0,0,255,0);
        drawer.submitObject(this);
    }
    draw() {

    }
    fixPosition(x, y) {
        this.sprite.x = x + this.offsetX;
        this.sprite.y = y + this.offsetY;
    }
}

class Behavior {
    constructor() {

    }

}
