

class Animal {
    constructor(option = {}) {
        this.identifiedName = option.id || Math.random().toString(36).substring(2);
        this.id = Math.random().toString(36).substring(2);
        this.position = option.position || {x:0, y:0};
        this.direction = Math.random() * 2 * Math.PI;
        this.velocity = 0.5;
        this.radius = {value: option.radius || 10};
        this.rotationSpeed = 0;
        // todo: colliderの初期値有りのときcollider.positionに参照渡しする
        this.colliders = [
            // {type:'circle', id:'large', position:this.position, radius:100},
            // {type:'circle', id:'medium', position:this.position, radius:60},
            {type:'circle', id:'my', position:this.position, radius:this.radius},
        ];
        // 生物種によるhabit:習慣
        this.creatureType = option.creatureType || 'herbivore';
        this.habit = {};
        switch ( this.creatureType ) {
            case 'herbivore':
                this.habit = new HerbivoreHabit({object: this});
                break;
            case 'plant':
                this.habit = new PlantHabit({object: this});
                break;
        }
        this.fillColor = option.fillColor || "#86efac";

        console.log(this.id, this.radius);

    }

    updateColliders() {
        this.colliders.forEach();
    }

    update() {
        this.habit.update();
        
        
        
    }

    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        // console.log(`衝突している！ own:${this.id}-${ownColliderID} ### op:${collidedObject.id}-${opponentColliderID}`);

        this.habit.onCollision(collidedObject, option);

    }

}

class HerbivoreHabit {
    constructor(option = {}) {
        this.object = option.object || {};
    }

    update () {
        this.object.rotationSpeed += 0.02 * (Math.random()-0.5);
        this.object.rotationSpeed = Math.max(Math.min(this.object.rotationSpeed, 0.1), -0.1);
        this.object.direction += this.object.rotationSpeed;
        this.moveTowardsDirection();
    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'plant') {
            this.object.radius.value += 0.5;
        }

    }

    moveTowardsDirection() {
        this.object.position.x += this.object.velocity * Math.cos(this.object.direction);
        this.object.position.y += this.object.velocity * Math.sin(this.object.direction);
    }

}

class PlantHabit {
    constructor(option = {}) {
        this.object = option.object || {};
    }

    update () {

    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'herbivore') {
            this.object.colliders = [];
            this.object.fillColor = 'rgba(231, 208, 182)';
        }

    }

}
