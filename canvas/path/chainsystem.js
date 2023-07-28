

class Animal {
    constructor(option = {}) {
        this.id = option.id || Math.random().toString(36).substring(2);
        this.position = {x:0, y:0};
        this.direction = Math.random() * 2 * Math.PI;
        this.velocity = 0.5;
        this.radius = 10;
        this.rotationSpeed = 0;
        this.colliders = [
            // {type:'circle', id:'large', position:this.position, radius:100},
            // {type:'circle', id:'medium', position:this.position, radius:60},
            {type:'circle', id:'my', position:this.position, radius:this.radius},
        ];
        // 生物種によるhabit:習慣
        this.creatureType = option.creatureType || 'herbivoreA';
        this.habit = {};
        switch ( this.creatureType ) {
            case 'herbivoreA':
                this.habit = new HerbivoreHabit({object: this});
                break;
            case 'plantA':
                this.habit = new PlantHabit({object: this});
                break;
        }

        console.log(this.id, );

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
        console.log(`衝突している！ own:${this.id}-${ownColliderID} ### op:${collidedObject.id}-${opponentColliderID}`);

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

}
