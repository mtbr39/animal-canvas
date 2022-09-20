let drawer;
let collectAreaManager;
let carrier;
let cargos;

let trace1;

function setup() {
    createCanvas(1080, 720);
    console.log("setup");

    drawer = new Drawer();
    mover = new Mover();
}

function draw() {
    background(0);

    drawer.draw();

    drawSprites();
}

function mousePressed() {

}
