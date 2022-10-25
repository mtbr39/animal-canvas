//==============================================================================
// [Require Class]
// Drawer
//==============================================================================

class Plant {
    constructor(options) {
        let x0 = options.x | 0;
        let y0 = options.y | 0;
        this.sprite = new Sprite(x0, y0, 16);
        this.sprite.type = "Plant";
        this.sprite.color = color(0,0,255,0);
        this.sprite.overlaps(allSprites);
        this.sprite.drag = 0;
        drawer.submitObject(this);
    }
    draw() {

    }
}

class PlantController {
    constructor() {
        this.group = new Group();
        let initialQuantity = 30;
        for (let i=0; i < initialQuantity; i++) { 
            let plant = new Plant({ x: Utl39.random(width), y: Utl39.random(height) });
        }
        drawer.submitObject(this);
    }
    draw() {
        
    }
}

