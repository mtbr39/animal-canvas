let drawer;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);

    drawingContext.shadowBlur = 16;
    drawingContext.shadowColor = color(255);

    drawer = new Drawer();
    let mover = new Mover();
    let plantController = new PlantController();
}

function draw() {
    background(0);

    fill(0, 0, 0, 1);
    strokeWeight(1.0);
    stroke(255);

    drawer.draw();
}

function mousePressed() {

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

