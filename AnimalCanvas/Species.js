class Herbivore extends Animal {
    constructor(option = {}) {
        super(option);

        this.creatureType == 'herbivore';
        this.layer = 20;
        this.exhaustVelocity = 0.005;
        // this.fillColor = 'yellow';
        this.radius.value = 5;
        this.reproductEnergyThreshold = 10;
        this.reproductNum = 2;
        this.colliders = [
            {type:'circle', id:'herbivoreBody', opponentIds:['plantBody', 'carnivoreBody'], position:this.position, radius:this.radius},
        ];
        this.doDisplayName = false;
        this.drawType = 'circle';
    }

    update () {
        this.animalCommonUpdate();
        this.hideNameOnDeath();
        this.randomWalkAction();
    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'plant' && collidedObject.status != 'death') {
            this.energy.value += 2;
        }
        if (collidedObject.creatureType == 'carnivore') {
            this.velocity = 0;
            this.fillColor = 'darkgray';
            this.changeStatus = 'death';
            this.exhaustVelocity = 0.03;
        }

    }

    hideNameOnDeath() {
        if (this.status == 'death') {
            this.objectDisplayName = false;
        }
    }

    randomWalkAction() {
        this.rotationSpeed += 0.02 * (Math.random()-0.5);
        this.rotationSpeed = Math.max(Math.min(this.rotationSpeed, 0.05), -0.05);
        this.direction += this.rotationSpeed;
        this.moveTowardsDirection();
    }
    

    moveTowardsDirection() {
        this.position.x += this.velocity * Math.cos(this.direction);
        this.position.y += this.velocity * Math.sin(this.direction);
    }

}

class Carnivore extends Animal {
    constructor(option = {}) {
        super( option );
       
        this.creatureType == 'carnivore';
        this.exhaustVelocity = 0.015;
        this.radius.value = 15;
        this.velocity = this.velocity * 3.0;
        this.fillColor = '#EB6973';
        this.reproductEnergyThreshold = 20;
        this.colliders = [
            {type:'circle', id:'carnivoreBody', opponentIds:['herbivoreBody'], position:this.position, radius:this.radius},
        ];
        this.drawType = 'sharpTriangle';
    }

    update () {
        this.animalCommonUpdate();
        this.randomWalkAction();
    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'herbivore' && collidedObject.status != 'death') {
            this.energy.value += 1.5;
        }

    }

    randomWalkAction() {
        this.rotationSpeed += 0.02 * (Math.random()-0.5);
        this.rotationSpeed = Math.max(Math.min(this.rotationSpeed, 0.05), -0.05);
        this.direction += this.rotationSpeed;
        this.moveTowardsDirectionWithGradient();
    }
    

    moveTowardsDirectionWithGradient() {
        let gradient = {x:-0.1, y:0};
        this.position.x += this.velocity * ( Math.cos(this.direction) + gradient.x);
        this.position.y += this.velocity * ( Math.sin(this.direction) + gradient.y);
    }
}

class Plant extends Animal {
    constructor(option = {}) {
        super(option);

        this.creatureType == 'plant';
        this.reviveTime = 900;
        this.deathTimer = 0;
        this.layer = 30;
        this.radius.value = 6;
        this.color = '#36C994';
        this.colorOnDead = '#c9ab73';
        this.fillColor = 'none';
        this.strokeColor = this.color;
        this.alpha = 0.5;
        this.colliders = [
            {type:'circle', id:'plantBody', opponentIds:['herbivoreBody'], position:this.position, radius:this.radius},
        ];
        this.collidersSet = this.colliders;
        this.drawType = 'circle';
        
    }

    update () {
        this.animalCommonUpdate();
        if (this.status == 'death') {
            this.deathTimer ++;
        } 
        if (this.deathTimer > this.reviveTime) {
            this.deathTimer = 0;
            this.status = 'live';
            this.colliders = this.collidersSet;
            this.strokeColor = this.color;
        }
    }
    onCollision(collidedObject, option) {
        const ownColliderID = option.ownColliderID || null;
        const opponentColliderID = option.opponentColliderID || null;
        if (collidedObject.creatureType == 'herbivore') {
            this.changeStatus = 'death';
            this.strokeColor = this.colorOnDead;
        }

    }

}
