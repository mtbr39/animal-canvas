//==============================================================================
// [Require Class]
// Drawer
//==============================================================================

class Plant {
    constructor(options) {
        let x0 = options.x | 0;
        let y0 = options.y | 0;
        this.sprite = createSprite(x0, y0, 20, 20);
        this.sprite.visible = false;
        this.radius = 10;
        this.sprite.drag = 100;
        drawer.submitObject(this);
    }
    draw() {
        fill(0, 0, 0, 1);
        strokeWeight(1.0);
        stroke(255);
        circle(this.sprite.position.x, this.sprite.position.y, this.radius);

    }
}

class PlantController {
    constructor() {
        this.group = new Group();
        let initialQuantity = 10;
        for (let i=0; i < initialQuantity; i++) { 
            let plant = new Plant({ x: Utl39.random(width), y: Utl39.random(height) });
        }
        drawer.submitObject(this);
    }
    draw() {
        
    }
}

