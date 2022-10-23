let drawer;
let collectAreaManager;
let carrier;
let cargos;

let trace1;

function setup() {
    createCanvas(1080, 720);
    // world.gravity.y = 10;
    console.log("setup");

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
