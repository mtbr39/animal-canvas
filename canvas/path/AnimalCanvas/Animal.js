

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

        // console.log(this.identifiedName, );

    }

    animalCommonUpdate() {
        this.updateStatus();
        this.exhaustEnergy();
        this.checkEnergyAndDeath();
    }

    updateStatus() {
        if (this.changeStatus != '') {
            this.status = this.changeStatus;
            this.changeStatus = '';
        }
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
