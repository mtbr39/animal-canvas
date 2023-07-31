

class Animal {
    constructor(option = {}) {
        this.identifiedName = option.identifiedName || Math.random().toString(36).substring(2);
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
        
        this.fillColor = option.fillColor || "#86efac";
        this.energy = this.radius;
        this.needDelete = false;
        this.canReproduct = false;
        this.reproductEnergyThreshold = 10;
        this.status = 'live';
        this.changeStatus = '';
        this.isReproduct = option.isReproduct || false;

        // 生物種によるhabit:習慣
        this.creatureType = option.creatureType || 'herbivore';
        this.habit = {};
        switch ( this.creatureType ) {
            case 'herbivore':
                this.habit = new HerbivoreHabit({object: this});
                break;
            case 'carnivore':
                this.habit = new CarnivoreHabit({object: this});
                break;
            case 'plant':
                this.habit = new PlantHabit({object: this});
                break;
        }

        console.log(this.id, );

    }

    update() {
        if (this.changeStatus != '') {
            this.status = this.changeStatus;
            this.changeStatus = '';
        }
        this.habit.update();
        this.checkEnergyAndDeath();
    }

    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        // console.log(`衝突している！ own:${this.id}-${ownColliderID} ### op:${collidedObject.id}-${opponentColliderID}`);

        this.habit.onCollision(collidedObject, option);

    }

    checkEnergyAndDeath () {
        
        if (this.energy.value <= 0) {
            this.radius.value = 0;
            this.needDelete = true;
        }
        if (this.energy.value >= this.reproductEnergyThreshold) {
            this.energy.value = this.reproductEnergyThreshold * 0.8;
            this.canReproduct = true;
        }
    }

}

class HerbivoreHabit {
    constructor(option = {}) {
        this.object = option.object || {};
        this.exhaustVelocity = 0.005;
        // this.object.fillColor = 'yellow';
        this.object.reproductEnergyThreshold = 10;
    }

    update () {
        this.randomWalkAction();
    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'plant' && collidedObject.status != 'death') {
            this.object.energy.value += 4.0;
        }
        if (collidedObject.creatureType == 'carnivore') {
            this.object.velocity = 0;
            this.object.fillColor = 'darkgray';
            this.object.changeStatus = 'death';
        }

    }

    randomWalkAction() {
        this.object.rotationSpeed += 0.02 * (Math.random()-0.5);
        this.object.rotationSpeed = Math.max(Math.min(this.object.rotationSpeed, 0.1), -0.1);
        this.object.direction += this.object.rotationSpeed;
        this.moveTowardsDirection();

        this.object.energy.value -= this.exhaustVelocity;
    }
    

    moveTowardsDirection() {
        this.object.position.x += this.object.velocity * Math.cos(this.object.direction);
        this.object.position.y += this.object.velocity * Math.sin(this.object.direction);
    }

}

class CarnivoreHabit {
    constructor(option = {}) {
        this.object = option.object || {};
        this.exhaustVelocity = 0.01;
        this.object.velocity = this.object.velocity * 1.5;
        this.object.fillColor = 'orange';
        this.object.reproductEnergyThreshold = 20;
    }

    update () {
        this.randomWalkAction();
    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'herbivore' && collidedObject.status != 'death') {
            this.object.energy.value += 5.0;
        }

    }

    randomWalkAction() {
        this.object.rotationSpeed += 0.02 * (Math.random()-0.5);
        this.object.rotationSpeed = Math.max(Math.min(this.object.rotationSpeed, 0.1), -0.1);
        this.object.direction += this.object.rotationSpeed;
        this.moveTowardsDirection();

        this.object.energy.value -= this.exhaustVelocity;
    }
    

    moveTowardsDirection() {
        this.object.position.x += this.object.velocity * Math.cos(this.object.direction);
        this.object.position.y += this.object.velocity * Math.sin(this.object.direction);
    }

}

class PlantHabit {
    constructor(option = {}) {
        this.object = option.object || {};
        this.reviveTime = 120;
        this.collidersSet = this.object.colliders;
        this.deathTimer = 0;
        this.object.strokeColor = this.object.fillColor;
    }

    update () {
        if (this.object.status == 'death') {
            this.deathTimer ++;
        } 
        if (this.deathTimer > this.reviveTime) {
            this.deathTimer = 0;
            this.object.status = 'live'
            this.object.colliders = this.collidersSet;
            this.object.strokeColor = "#86efac";
        }
    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'herbivore') {
            this.object.changeStatus = 'death';
            // this.object.colliders = [];
            this.object.strokeColor = 'rgba(231, 208, 182)';
        }

    }

}

class AnimalFactory {
    constructor(option = {}) {
        this.animals = [];
        this.distributer = option.distributer || {};
    }

    make(option) {
        let animal = new Animal(option);
        this.animals.push(animal);
        this.distributer.submitObject(animal);
    }
    update() {
        this.animals.forEach( (animal) => {
            this.checkCanReproduct(animal);
        } );
    }

    checkCanReproduct (animal) {
        if(animal.canReproduct) {
            animal.canReproduct = false;
            this.make({
                identifiedName: utl.randomStringLikeSynbolID(),
                position: {x:animal.position.x, y:animal.position.y},
                creatureType: animal.creatureType,
                radius: 6,
                isReproduct: true,
            });
        }
    }

}
