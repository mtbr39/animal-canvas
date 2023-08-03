

class ObjectDistributer {
    constructor(option) {
        this.canvas = option.canvas;
        this.objects = [];
        this.debugMode = false;
        option.objects = this.objects;
        this.collisionManager = new CollisionManager(option);
        this.drawManager = new DrawManager(option);

    }

    submitObject(object) {
        this.objects.push(object);
    }
    update() {
        this.checkAndDeleteObject();

        this.objects.forEach( (object) => {
            object.update();
        } );
    }
    onMouseMove(input) {
        
    }
    onMouseHoldDown(input) {
        this.drawManager.onMouseHoldDown(input);
    }

    onMouseWheel(input) {
        this.drawManager.onMouseWheel(input);
    }

    checkAndDeleteObject() {
        this.objects.forEach( (object, index) => {
            if (object.needDelete) {
                this.objects.splice(index, 1);
            }
        } );
    }
    
}
