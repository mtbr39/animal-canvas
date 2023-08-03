

class ObjectDistributer {
    constructor(option) {
        this.canvas = option.canvas;
        // this.ctx = option.ctx;
        this.cw = option.cw;
        this.org = option.org;
        this.objects = [];
        this.debugMode = false;
        option.objects = this.objects;
        this.collisionManager = new CollisionManager(option);
        this.drawManager = new DrawManager(option);

    }

    submitObject(object) {
        this.objects.push(object);
        if (typeof object.collider == 'undefined') {
            this.collisionManager.submit(object);
        }
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
