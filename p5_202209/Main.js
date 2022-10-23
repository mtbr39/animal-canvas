let drawer;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("main-id");
    canvas.style("display", "block");

    drawer = new Drawer();
    mover = new Mover();
    plantController = new PlantController();



}

function draw() {
    background(0);

    drawer.draw();

    // drawSprites();

    // allSprites.debug = mouse.pressing();
}

function mousePressed() {

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

