window.addEventListener('load', () => {

    let canvas = document.getElementById('canvas');

    canvas.style.backgroundColor = '#F6ECE6';

    let cssCanvasSize = {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
    let pixelRatioCanvasSize = {width: cssCanvasSize.width * window.devicePixelRatio, height: cssCanvasSize.height * window.devicePixelRatio};
    canvas.width = pixelRatioCanvasSize.width;
    canvas.height = pixelRatioCanvasSize.height;
    let ctx = canvas.getContext('2d');
    
    const canvasWidthCw = 0.001 * 1.8;
    // const canvasHeightCw = canvasWidthCw / canvas.width * canvas.height;
    let cw = Math.sqrt(canvas.width * canvas.height) * canvasWidthCw; // canvasのピクセル面積に対して描写比率を決定
    // let org = {x: canvas.width / cw / 2 , y: canvas.height / cw / 2};
    let org = {x: 0, y: 0};

    let calcCanvasSize = {width: canvas.width / cw, height: canvas.height / cw};
    let cageSize = {x: calcCanvasSize.width*0.05, y: calcCanvasSize.height*0.05, width: calcCanvasSize.width * 0.9, height: calcCanvasSize.height * 0.9};

    //クラスインスタンス生成など
    const objectDistributer = new ObjectDistributer( {canvas: canvas, ctx: ctx, cw: cw, org: org} );
    const inputManager = new InputManager( {canvas: canvas, ctx: ctx, cw: cw, org: org} );
    inputManager.submitReceiver( objectDistributer );

    const animalFactory = new AnimalFactory({distributer: objectDistributer, org: org, cageSize: cageSize});

    animalFactory.makeMultiple({ creatureType: 'herbivore', number: 40, box: cageSize,});
    animalFactory.makeMultiple({ creatureType: 'plant', number: 400, box: cageSize,});
    animalFactory.makeMultiple({ creatureType: 'carnivore', number: 2, box: cageSize,});
    
    let backgroundObject = new BackgroundObject( {drawManager:objectDistributer.drawManager, cageSize: cageSize, calcCanvasSize: calcCanvasSize} );

    // FrameLoop
    const fps = 60;

    let targetInterval = 1000 / fps;
    let previousTime = Date.now() - targetInterval;

    function loop() {
        let currentTime = Date.now();
        if (currentTime - previousTime > targetInterval) {
            // console.log("loop-debug", currentTime-previousTime);
            update();
            previousTime = Date.now();
        }
        requestAnimationFrame(loop);
    }

    function update() {
        let currentTime = Date.now();

        objectDistributer.collisionManager.check();
        animalFactory.update();
        inputManager.update();
        objectDistributer.update();
        objectDistributer.drawManager.draw();

        ctx.font = "40px 'M PLUS Rounded 1c',serif";
        ctx.fillStyle = 'white';
        // ctx.fillText(`デバッグ${window.devicePixelRatio}`, 100,100);

        let updateTime = Date.now() - currentTime;
        // console.log("update-time-debug", updateTime);
    }

    loop();

    

    resizeCanvas();
    // window.onresize = resizeCanvas;

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

    document.addEventListener("touchmove", (event) => {
        if (event.touches.length >= 2) {
            event.preventDefault();
        }
    }, { passive: false });

})
