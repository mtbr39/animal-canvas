class Updater {
    constructor() {
        this.instances = [];


        // this.loop();
    }

    submitInstances(instances) {
        instances.forEach( (instance) => {
            this.instances.push(instance);
        } );
    }

    // loop() {
    //     let currentTime = Date.now();
    //     let continueLoop = true;

    //     let fps = 60;
    //     let targetInterval = 1000 / fps;
    //     let previousTime = Date.now() - targetInterval;

    //     const f = () => {
    //         if (currentTime - previousTime > targetInterval) {
    //             // console.log("loop-debug", currentTime-previousTime);
    //             console.log("updater-debug", previousTime);
    //             this.update();
    //             previousTime = Date.now();
    //         }
    
    //         if (continueLoop) {
    //             requestAnimationFrame(this.loop);
    //         }
    //     }

    //     f();
        
    // }

    update() {
        let currentTime = Date.now();

        this.instances.forEach( (instance) => {
            instance.update();
        } );

        // collisionManager.check();
        // animalFactory.update();
        // inputManager.update();
        // objectDistributer.update();
        // drawManager.draw();

        // ctx.font = "40px 'M PLUS Rounded 1c',serif";
        // ctx.fillStyle = 'white';
        // ctx.fillText(`デバッグ${window.devicePixelRatio}`, 100,100);

        let updateTime = Date.now() - currentTime;
        // console.log("update-time-debug", updateTime);
    }
}