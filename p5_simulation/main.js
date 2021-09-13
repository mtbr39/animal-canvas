let carrier;
let cargos;

let trace1;

function setup() {
    createCanvas(1080, 720);

    trace1 = new Trace();
    carrier = new Carrier();
    cargos = new Cargos();
}

function draw() {
    background(50);

    carrier.draw();
    cargos.draw();

    drawSprites();
}

function mousePressed() {
    cargos.onMousePressed();
}
