window.addEventListener('load', () => {

    let canvas = document.getElementById('canvas');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    let ctx = canvas.getContext('2d');
    
    const canvasWidthCw = 600;
    let cw = canvas.width / canvasWidthCw;
    let org = {x: canvasWidthCw / 2, y: canvasWidthCw / 2};

    let cageSize = {width: 500, height: 500};

    //クラスインスタンス生成など
    const objectDistributer = new ObjectDistributer( {canvas: canvas, ctx: ctx, cw: cw, org: org} );
    const inputManager = new InputManager( {canvas: canvas, ctx: ctx, cw: cw, org: org} );
    inputManager.submitReceiver( objectDistributer );

    const animalFactory = new AnimalFactory({distributer: objectDistributer, org: org, cageSize: cageSize});

    for (let i=0; i<40; i++) {
        animalFactory.make({
            identifiedName: utl.randomStringLikeSynbolID(),
            position: {x: (Math.random()-0.5) * cageSize.width, y: (Math.random()-0.5) * cageSize.height},
            creatureType: 'herbivore',
        });
    }

    let alphaPlants = [];
    for (let i=0; i<400; i++) {
        alphaPlants[i] = new Animal({
            position: {x: (Math.random()-0.5) * cageSize.width, y: (Math.random()-0.5) * cageSize.height},
            creatureType: 'plant',
        });
        objectDistributer.submitObject(alphaPlants[i]);
    }

    for (let i=0; i<2; i++) {
        animalFactory.make({
            identifiedName: utl.randomStringLikeSynbolID(),
            position: {x: (Math.random()-0.5) * cageSize.width, y: (Math.random()-0.5) * cageSize.height},
            creatureType: 'carnivore',
        });
        objectDistributer.submitObject(alphaPlants[i]);
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
        objectDistributer.collisionManager.check();
        animalFactory.update();
        inputManager.update();
        objectDistributer.update();
        objectDistributer.drawManager.draw();

    }

    loop();

    

    resizeCanvas();
    window.onresize = resizeCanvas;

    function resizeCanvas() {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    };

})
