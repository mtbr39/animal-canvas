window.addEventListener('load', () => {

    let canvas = document.getElementById('canvas');

    let cssCanvasSize = {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
    let pixelRatioCanvasSize = {width: cssCanvasSize.width * window.devicePixelRatio, height: cssCanvasSize.height * window.devicePixelRatio};
    canvas.width = pixelRatioCanvasSize.width;
    canvas.height = pixelRatioCanvasSize.height;
    let ctx = canvas.getContext('2d');
    
    const canvasWidthCw = 600;
    const canvasHeightCw = canvasWidthCw / canvas.width * canvas.height;
    let cw = canvas.width / canvasWidthCw;
    let org = {x: canvasWidthCw / 2, y: canvasHeightCw / 2};

    let cageSize = {width: canvasWidthCw*0.9, height: canvasHeightCw*0.9};

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

        ctx.font = "40px 'M PLUS Rounded 1c',serif";
        ctx.fillStyle = 'white';
        // ctx.fillText(`デバッグ${window.devicePixelRatio}`, 100,100);

    }

    loop();

    

    resizeCanvas();
    window.onresize = resizeCanvas;

    function resizeCanvas() {
        canvas.style.width = `${cssCanvasSize.width}px`;
        canvas.style.height = `${cssCanvasSize.height}px`;
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        canvas.width = pixelRatioCanvasSize.width;
        canvas.height = pixelRatioCanvasSize.height;
        if(utl.isSmartPhone()) {
            canvas.width = size.w * window.devicePixelRatio;
            canvas.height = size.h * window.devicePixelRatio;
        }
    };

})
