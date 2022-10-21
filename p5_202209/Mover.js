class Mover {
    constructor() {
        this.sprite = createSprite(width / 2, height / 2, 40, 40);
        this.sprite.visible = false;
        // this.sprite.velocity.x = 2.0;
        this.sprite.addSpeed(0.2, this.sprite.rotation);
        this.vision = new Vision({ x: this.sprite.position.x, y: this.sprite.position.y, offsetX: this.sprite.width});
        drawer.submitObject(this);
    }
    draw() {
        this.vision.fixPosition(this.sprite.position.x, this.sprite.position.y);

        fill(0,0,0,1);
        strokeWeight(1.0);
        stroke(255);
        rect(this.sprite.position.x - this.sprite.width / 2, this.sprite.position.y - this.sprite.height / 2, this.sprite.width, this.sprite.height);
        
    }
    somefunciton() {

    }
}

class Vision {
    constructor(options) {
        let x0 = options.x | 0;
        let y0 = options.y | 0;
        this.offsetX = options.offsetX | 0;
        this.offsetY = options.offsetY | 0;
        this.sprite = createSprite(x0 + this.offsetX, y0 + this.offsetY, 200, 160);
        this.sprite.visible = false;
        // this.sprite.velocity.x = 2.0;
        drawer.submitObject(this);
    }
    draw() {
        fill(0, 0, 0, 1);
        strokeWeight(1.0);
        stroke(255);
        rect(this.sprite.position.x - this.sprite.width / 2, this.sprite.position.y - this.sprite.height / 2, this.sprite.width, this.sprite.height);
    }
    fixPosition(x, y) {
        this.sprite.position.x = x + this.offsetX;
        this.sprite.position.y = y + this.offsetY;
    }
}
