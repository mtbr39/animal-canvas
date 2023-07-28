window.addEventListener('load', () => {

    let canvas = document.getElementById('canvas');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    let ctx = canvas.getContext('2d');
    
    const canvasAndXYRate = 250;
    let cw = canvas.width / canvasAndXYRate;
    let org = {x: 100, y: 100};

    //クラスインスタンス生成など
    const drawer = new Drawer({canvas: canvas, ctx: ctx, cw: cw, org: org});
    
    let alphaAnimals = [];
    for (let i=0; i<10; i++) {
        alphaAnimals[i] = new Animal({
            id: utl.randomStringLikeSynbolID(),
            creatureType: 'herbivore',
        });
        drawer.submitObject(alphaAnimals[i]);
    }

    let alphaPlants = [];
    for (let i=0; i<50; i++) {
        alphaPlants[i] = new Animal({
            id: utl.randomStringLikeSynbolID(),
            position: {x: (Math.random()-0.5)*canvasAndXYRate, y: (Math.random()-0.5)*canvasAndXYRate},
            radius: 2,
            creatureType: 'plant',
            // colliders: [
            //     {type:'circle', id:'my', position:this.position, radius:2},
            // ]

        });
        drawer.submitObject(alphaPlants[i]);
    }
    

    // FrameLoop
    const fps = 60;

    let targetInterval = 1000 / fps;
    let previousTime = Date.now() - targetInterval;

    function loop() {
        let currentTime = Date.now();
        if (currentTime - previousTime > targetInterval) {
            update();
            previousTime = Date.now();
        }
        requestAnimationFrame(loop);
    }

    function update() {
        drawer.checkCollision();
        drawer.update();
        drawer.draw();

    }

    loop();

    // ---- マウスイベント ----

    canvas.addEventListener('mousedown', (e) => {
        
    });

    canvas.addEventListener('mouseup', () => {

    });

    canvas.addEventListener('mousemove', (e) => {
        
    });

    resizeCanvas();
    window.onresize = resizeCanvas;

    function resizeCanvas() {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    };

})
