let drawer;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("main-id");
    canvas.style("display", "block");

    drawingContext.shadowBlur = 16;
    drawingContext.shadowColor = color(255);

    drawer = new Drawer();
    mover = new Mover();
    plantController = new PlantController();



}

function draw() {
    background(0);

    fill(0, 0, 0, 1);
    strokeWeight(1.0);
    stroke(255);

    drawer.draw();

    // drawSprites();

    // allSprites.debug = mouse.pressing();
}

function mousePressed() {

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

