let drawer;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);

    drawingContext.shadowBlur = 16;
    drawingContext.shadowColor = color(255);

    drawer = new Drawer();
    let mover = new Mover();
    let plantController = new PlantController();

    s01 = new Sprite(400, 400, 400,400);

    s01.overlaps(allSprites, (mySprite, targetSprite) => {

        if (targetSprite.type == "Plant") {
            console.log("s01 plant find");
            targetSprite.color = color(0, 0, 255, 0);
        }
    });


}

function draw() {
    background(0);

    fill(0, 0, 0, 1);
    strokeWeight(1.0);
    stroke(255);

    drawer.draw();

    // s01.moveTowards(mouse.x, mouse.y);

    // drawSprites();

    // allSprites.debug = mouse.pressing();
}

function mousePressed() {

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

