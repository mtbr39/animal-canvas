class Carrier {
    constructor() {
        this.sprite = createSprite(width / 2, height / 2, 40, 40);
        this.sprite.shapeColor = color(255);
        this.sprite.velocity.x = 2.0;
        // this.sprite.friction = 0.01;
        this.sprite.maxSpeed = 4;
        this.moveTime = 0;
        this.trace = trace1; //ほんとは new Trace();
    }
    draw() {
        this.trace.updateParent(this.sprite.position);
        if (millis() - this.moveTime > 4000) {
            this.moveTime = millis();
            this.sprite.velocity.x = this.sprite.velocity.x * -1;
        }
    }
}