

class Animal {
    constructor(option = {}) {
        this.identifiedName = option.identifiedName || Math.random().toString(36).substring(2);
        this.id = Math.random().toString(36).substring(2);
        this.position = option.position || {x:0, y:0};
        this.direction = Math.random() * 2 * Math.PI;
        this.velocity = 0.5;
        this.radius = {value: option.radius || 10};
        this.rotationSpeed = 0;
        this.layer = 0;
        this.colliders = [
            {type:'circle', id:'my', position:this.position, radius:this.radius},
        ];
        this.collidersSet = this.colliders;
        
        // this.fillColor = option.fillColor || "#86efac";
        this.fillColor = option.fillColor || '#36C994';
        this.alpha = 0.8;
        this.energy = this.radius;
        this.exhaustVelocity = 0;
        this.needDelete = false;
        this.canReproduct = false;
        this.reproductEnergyThreshold = 15;
        this.status = 'live';
        this.changeStatus = '';
        this.isReproduct = option.isReproduct || false;
        this.reproductNum = 1;
        this.doDisplayName = false;

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

        // console.log(this.identifiedName, );

    }

    update() {
        if (this.changeStatus != '') {
            this.status = this.changeStatus;
            this.changeStatus = '';
        }
        this.habit.update();
        this.exhaustEnergy();
        this.checkEnergyAndDeath();
    }

    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        // console.log(`衝突している！ own:${this.id}-${ownColliderID} ### op:${collidedObject.id}-${opponentColliderID}`);

        this.habit.onCollision(collidedObject, option);

    }

    exhaustEnergy () {
        this.energy.value -= this.exhaustVelocity;
    }

    checkEnergyAndDeath () {
        if (this.status == 'death' && this.colliders != []) {
            this.colliders = [];
        }
        if (this.energy.value <= 0.5) {
            this.radius.value = 0;
            this.needDelete = true;
        }
        if (this.energy.value >= this.reproductEnergyThreshold) {
            this.energy.value = this.reproductEnergyThreshold * 0.6;
            this.canReproduct = true;
        }
    }

}

class HerbivoreHabit {
    constructor(option = {}) {
        this.object = option.object || {};
        this.object.layer = 20;
        this.object.exhaustVelocity = 0.01;
        // this.object.fillColor = 'yellow';
        this.object.radius.value = 6;
        this.object.reproductEnergyThreshold = 10;
        this.object.reproductNum = 2;
        this.object.colliders = [
            {type:'circle', id:'herbivoreBody', opponentIds:['plantBody', 'carnivoreBody'], position:this.object.position, radius:this.object.radius},
        ];
        this.object.doDisplayName = true;
    }

    update () {
        this.uploadStatus();
        this.randomWalkAction();
    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'plant' && collidedObject.status != 'death') {
            this.object.energy.value += 2;
        }
        if (collidedObject.creatureType == 'carnivore') {
            this.object.velocity = 0;
            this.object.fillColor = 'darkgray';
            this.object.changeStatus = 'death';
            this.object.exhaustVelocity = 0.03;
        }

    }

    uploadStatus() {
        if (this.object.status == 'death') {
            this.objectDisplayName = false;
        }
    }

    randomWalkAction() {
        this.object.rotationSpeed += 0.02 * (Math.random()-0.5);
        this.object.rotationSpeed = Math.max(Math.min(this.object.rotationSpeed, 0.05), -0.05);
        this.object.direction += this.object.rotationSpeed;
        this.moveTowardsDirection();
    }
    

    moveTowardsDirection() {
        this.object.position.x += this.object.velocity * Math.cos(this.object.direction);
        this.object.position.y += this.object.velocity * Math.sin(this.object.direction);
    }

}

class CarnivoreHabit {
    constructor(option = {}) {
        this.object = option.object || {};
        this.object.exhaustVelocity = 0.015;
        this.object.radius.value = 15;
        this.object.velocity = this.object.velocity * 3.0;
        this.object.fillColor = '#EB6973';
        this.object.reproductEnergyThreshold = 30;
        this.object.colliders = [
            {type:'circle', id:'carnivoreBody', opponentIds:['herbivoreBody'], position:this.object.position, radius:this.object.radius},
        ];
        this.object.drawType = 'sharpTriangle';
    }

    update () {
        this.randomWalkAction();
    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'herbivore' && collidedObject.status != 'death') {
            this.object.energy.value += 1.5;
        }

    }

    randomWalkAction() {
        this.object.rotationSpeed += 0.02 * (Math.random()-0.5);
        this.object.rotationSpeed = Math.max(Math.min(this.object.rotationSpeed, 0.05), -0.05);
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
        this.reviveTime = 900;
        this.deathTimer = 0;
        this.object.layer = 30;
        this.object.radius.value = 6;
        this.object.strokeColor = this.object.fillColor;
        this.object.alpha = 0.5;
        this.object.colliders = [
            {type:'circle', id:'plantBody', opponentIds:['herbivoreBody'], position:this.object.position, radius:this.object.radius},
        ];
        this.collidersSet = this.object.colliders;
        
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
            this.object.strokeColor = 'rgba(231, 208, 182)';
        }

    }

}

class AnimalFactory {
    constructor(option = {}) {
        this.animals = [];
        this.distributer = option.distributer || {};
        this.org = option.org;
        this.cageSize = option.cageSize || {width: 100, height: 100};
    }

    make(option) {
        let animal = new Animal(option);
        this.animals.push(animal);
        this.distributer.submitObject(animal);
    }
    update() {
        this.animals.forEach( (animal) => {
            this.teleportOutsideCage(animal);
            this.checkCanReproduct(animal);
        } );
    }

    makeMultiple(option = {}) {
        let number = option.number;
        let box = option.box; // {x: y: width: height:}
        let creatureType = option.creatureType;
        console.log("option-debug", option);
        for(let i=0; i<number; i++) {
            this.make({
                identifiedName: utl.randomStringLikeSynbolID(),
                position: {x: box.x + (Math.random()) * box.width, y: box.y + (Math.random()) * box.height},
                creatureType: creatureType,
            });
        }
        
    }

    checkCanReproduct (animal) {
        if(animal.canReproduct) {
            for (let i=0; i<animal.reproductNum; i++) {
                animal.canReproduct = false;
                this.make({
                    identifiedName: utl.randomStringLikeSynbolID(),
                    position: {x:animal.position.x, y:animal.position.y},
                    creatureType: animal.creatureType,
                    radius: animal.radius.value,
                    fillColor : animal.fillColor,
                    isReproduct: true,
                });
            }
            
        }
    }

    teleportOutsideCage (animal) {
        let teleportType = 'noTeleport';
        let whichSideX = animal.position.x/Math.abs(animal.position.x);
        let whichSideY = animal.position.y/Math.abs(animal.position.y);
        if (teleportType == 'noTeleport') {
            
        }
        if (teleportType == 'allSideTeleport') {
            whichSideX *= -1;
            whichSideY *= -1;
        }
        if (teleportType == 'oneSideTeleport') {
            whichSideX = 1;
            whichSideY = 1;
        }
        let halfCageSize = {width: this.cageSize.width/2, height: this.cageSize.height/2}
        if ( animal.position.x < this.cageSize.x ) {
            animal.position.x = this.cageSize.x;
        }
        if( animal.position.x > this.cageSize.x + this.cageSize.width ) {
            animal.position.x = this.cageSize.x + this.cageSize.width;
        }
        if ( animal.position.y < this.cageSize.y ) {
            animal.position.y = this.cageSize.y;
        }
        if( animal.position.y > this.cageSize.y + this.cageSize.height ) {
            animal.position.y = this.cageSize.y + this.cageSize.height;
        }
    }

}
