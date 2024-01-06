

class ObjectDistributer {
    constructor(option) {
        this.canvas = option.canvas;
        this.objects = [];
        option.objects = this.objects;

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

    checkAndDeleteObject() {
        this.objects.forEach( (object, index) => {
            if (object.needDelete) {
                this.objects.splice(index, 1);
            }
        } );
    }
    
}
