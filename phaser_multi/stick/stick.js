//python -m http.server 8000
//python -m SimpleHTTPServer 8000
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
    // this.load.image('sky', 'assets/sky.png');
    // this.load.image('ground', 'assets/platform.png');
    // this.load.image('star', 'assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');
    // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    
    platforms = this.physics.add.staticGroup();

    console.log(typeof(this.physics.add), this.physics.add);
    console.log(typeof(this.physics), this.physics);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#f00' });

    let r1 = new Phaser.Geom.Rectangle(200, 200, 148, 148);

    let r2 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);



}

function update() {
    
}


// function hitBomb(player, bomb) {
//     this.physics.pause();

//     player.setTint(0xff0000);

//     player.anims.play('turn');

//     gameOver = true;
// }
