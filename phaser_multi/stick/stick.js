//python -m http.server 8000
//python -m SimpleHTTPServer 8000
//タッチイベント  https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var stick;

var game = new Phaser.Game(config);

function preload() {
    this.load.image("circle", "img/Circle128.png");
    this.load.image("square", "img/Square128.png");
}

class Stick extends Phaser.GameObjects.Container {
    constructor(scene, x, y, optionsParam) {
        const options = optionsParam || {};
        super(scene, x, y);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        this.circle = this.scene.physics.add
            .sprite(200, 450, "circle")
            .setScale(0.5);

        this.circle
        .setInteractive({ draggable: true })
        .on("dragstart", function (pointer, dragX, dragY) {
            // ...
        })
        .on("drag", function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY); //ここではthisはthis.circleを指す！
        })
        .on("dragend", function (pointer, dragX, dragY, dropped) {
            // ...
        });
  }
}

function create() {
    
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "square").setScale(0.5).refreshBody();
    platforms.create(600, 400, "square");

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '64px', fill: '#f00' });

    player = this.physics.add.sprite(100, 450, "circle");

    stick = new Stick(this);

    stick1 = new Stick(this);

    console.log(stick, stick1);


}

function update() {
    var pointer = this.input.activePointer;
    if (pointer.isDown) {
        var touchX = pointer.x;
        var touchY = pointer.y;
        // console.log(touchX, touchY);
    }
}
