
class AnimalFactory {
    constructor(option = {}) {
        this.animals = [];
        this.distributer = option.distributer || {};
        this.org = option.org;
        this.cageSize = option.cageSize || {width: 100, height: 100};
    }

    make(option) {
        let animal = {};
        switch ( option.creatureType ) {
            case 'herbivore':
                animal = new Herbivore(option);
                break;
            case 'carnivore':
                animal = new Carnivore(option);
                break;
            case 'plant':
                animal = new Plant(option);
                break;
        }
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
        let box = this.cageSize; // {x: y: width: height:}
        let creatureType = option.creatureType;
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
                let randomBit = Math.floor(Math.random * 2); // 0 or 1
                let parentName = animal.identifiedName.substr(0,2);
                this.make({
                    identifiedName: randomBit == 0 ? animal.identifiedName :  parentName + utl.randomStringLikeSynbolID(),
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
