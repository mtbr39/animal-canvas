window.addEventListener('load', () => {

    let canvas = document.getElementById('canvas');

    canvas.style.backgroundColor = '#F6ECE6';

    let cssCanvasSize = {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
    let pixelRatioCanvasSize = {width: cssCanvasSize.width * window.devicePixelRatio, height: cssCanvasSize.height * window.devicePixelRatio};
    canvas.width = pixelRatioCanvasSize.width;
    canvas.height = pixelRatioCanvasSize.height;
    let ctx = canvas.getContext('2d');
    
    const canvasAreaRatio = 0.001 * 2.0;
    let cw = Math.sqrt(canvas.width * canvas.height) * canvasAreaRatio; // canvasのピクセル面積に対して描写比率を決定
    let org = {x: 0, y: 0};

    let calcCanvasSize = {width: canvas.width / cw, height: canvas.height / cw};
    let cageSize = [
        {x: calcCanvasSize.width*0.05, y: calcCanvasSize.height*0.05, width: calcCanvasSize.width * 0.4, height: calcCanvasSize.height * 0.9},
        {x: calcCanvasSize.width*0.5, y: calcCanvasSize.height*0.05, width: calcCanvasSize.width * 0.4, height: calcCanvasSize.height * 0.9},
    ];

    //クラスインスタンス生成など
    const updater = new Updater();
    const objectDistributer = new ObjectDistributer( {canvas: canvas, ctx: ctx, cw: cw, org: org} );
    const drawManager = new DrawManager( {canvas: canvas, ctx: ctx, cw: cw, org: org, objects: objectDistributer.objects} );
    const collisionManager = new CollisionManager( {objects: objectDistributer.objects} );
    const inputManager = new InputManager( {canvas: canvas, ctx: ctx, cw: cw, org: org} );
    inputManager.submitReceiver( drawManager );

    updater.submitInstances([objectDistributer, drawManager, collisionManager, inputManager]);

    let animalFactory = [];
    let backgroundObject = [];
    for(let i=0; i<2; i++) {
        animalFactory.push( new AnimalFactory({distributer: objectDistributer, org: org, cageSize: cageSize[i]}) );

        updater.submitInstances([animalFactory[i]]);
    
        animalFactory[i].makeMultiple({ creatureType: 'herbivore', number: 10});
        animalFactory[i].makeMultiple({ creatureType: 'plant', number: 100});
        if(i!=0) animalFactory[i].makeMultiple({ creatureType: 'carnivore', number: 2});
        
        let mainText = i==0 ? "草食動物のみの場合" : "肉食動物がいる場合";
        backgroundObject.push( new BackgroundObject( {drawManager:drawManager, cageSize: cageSize[i], calcCanvasSize: calcCanvasSize, mainText: mainText} ) );
    }


    // FrameLoop
    const fps = 60;

    let targetInterval = 1000 / fps;
    let previousTime = Date.now() - targetInterval;

    function loop() {
        let currentTime = Date.now();
        if (currentTime - previousTime > targetInterval) {
            // console.log("loop-debug", currentTime-previousTime);
            updater.update();
            previousTime = Date.now();
        }
        requestAnimationFrame(loop);
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
