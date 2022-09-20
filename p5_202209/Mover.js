class Mover {
    constructor() {
        this.sprite = createSprite(width / 2, height / 2, 40, 40);
        this.sprite.visible = false;
        this.sprite.velocity.x = 2.0;
        drawer.submitObject(this);
        console.log(this.sprite, this.sprite.y);
    }
    draw() {
        fill(0,0,0,1);
        strokeWeight(1.0);
        stroke(255);
        rect(this.sprite.position.x - this.sprite.width / 2, this.sprite.position.y - this.sprite.height / 2, this.sprite.width, this.sprite.height);
        rect(40, 40, 60, 60);
        
    }
    somefunciton() {

    }
}
