let drawer;
let carrier;
let cargos;

let trace1;

function setup() {
    createCanvas(1080, 720);

    drawer = new Drawer();
    trace1 = new Trace();
    carrier = new Carrier();
    cargos = new Cargos();
}

function draw() {
    background(50);

    drawer.draw();

    drawSprites();
}

function mousePressed() {
    cargos.onMousePressed();
}
