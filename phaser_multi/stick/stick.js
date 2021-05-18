//python -m http.server 8000
//python -m SimpleHTTPServer 8000
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

var game = new Phaser.Game(config);

function preload() {
    this.load.image("circle", "img/Circle128.png");
    this.load.image("square", "img/Square128.png");
}

function create() {
    
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "square").setScale(2).refreshBody();
    platforms.create(600, 400, "square");

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '64px', fill: '#f00' });

    player = this.physics.add.sprite(100, 450, "circle");




}

function update() {
    
}
