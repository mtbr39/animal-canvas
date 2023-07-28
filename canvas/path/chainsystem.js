

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

class Drawer {
    constructor(option) {
        this.canvas = option.canvas;
        this.ctx = option.ctx;
        this.cw = option.cw;
        this.org = option.org;
        this.objects = [];
        this.debugMode = false;
    }

    submitObject(object) {
        this.objects.push(object);
    }
    update() {
        this.objects.forEach( (object) => {
            object.update();
        } );
    }
    checkCollision() {
        this.objects.forEach( (targetObject) => {
            this.objects.forEach( (checkObject) => {
                if (targetObject.id !== checkObject.id) {
                    targetObject.colliders.forEach( (targetCollider) => {
                        checkObject.colliders.forEach( (checkCollider) => {
                            if ( Drawer.isOverlappedCircle( targetCollider, checkCollider ) ) {
                                targetObject.onCollision(checkObject, {ownColliderID: targetCollider.id, opponentColliderID: checkCollider.id});
                            }
                        } );
                    } );
                    

                }
            } );
        } );
    }
    static isOverlappedCircle(circle1, circle2) { // collider = {position:, radius}
        let isOverlapped = false;
        if ( this.distance(circle1.position, circle2.position) <= circle1.radius + circle2.radius ) {
            isOverlapped = true;
        }
        return isOverlapped;

    }
    static distance(p1, p2) {
        return ( (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 ) ** (1/2);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.objects.forEach( (object) => {
            this.drawObject(object);
        } );
    }
    drawObject(object) {
        if (object.drawType === undefined) {
            this.circle(object.position, object.radius);
            this.fillText(object.id, object.position, {
                offset:{x:-4, y:-10}, size:4, color:'darkgray', strokeWidth:'none',
            });
        }
        if (this.debugMode) {
            object.colliders.forEach( (collider) => {
                this.circle(collider.position, collider.radius, {
                    strokeColor:'gray',
                    lineWidth:1
                })
            } );
        }
    }

    // ---- 自作描写ライブラリ ----
    canvasPoint(point) {
        return {x: (this.org.x + point.x) * this.cw, y: (this.org.y + point.y) * this.cw}
    }
    circle(p, radius, option={}) {
        const strokeColor = option.strokeColor || 'none';
        const lineWidth = option.lineWidth || 4;
        this.ctx.beginPath();
        this.ctx.arc(this.canvasPoint(p).x, this.canvasPoint(p).y, radius*this.cw, 0, Math.PI * 2, true);
        if (strokeColor == 'none') {
            this.ctx.fillStyle = "#86efac";
            this.ctx.fill();
        } else {
            this.ctx.globalAlpha = 0.3;
            this.ctx.strokeStyle = strokeColor;
            this.ctx.lineWidth = lineWidth;
            this.ctx.stroke();
            this.ctx.globalAlpha = 1.0;
        }
        
    }
    fillText(text, point, option = {}) {
        const offset = option.offset || {x:0, y:0};
        const size = option.size || 10;
        const color = option.color || "black";
        const strokeWidth = option.strokeWidth || "none";
        this.ctx.font = size*this.cw+"px 'M PLUS Rounded 1c',serif";
        if (strokeWidth == 'none') {
            this.ctx.fillStyle = color;
            this.ctx.fillText(text, this.canvasPoint(point).x + offset.x*this.cw, this.canvasPoint(point).y + offset.y*this.cw);
        } else {
            this.ctx.lineWidth = strokeWidth*this.cw;
            this.ctx.strokeText(text, this.canvasPoint(point).x + offset.x*this.cw, this.canvasPoint(point).y + offset.y*this.cw);
        }
    }
    

    // ---- 以前作成したもの ----
    drawLine(p1, p2, option = {}) {
        this.ctx.beginPath();
        this.modMoveTo(p1);
        this.modLineTo(p2);
        let lineColor = 'black'; 
        if (option.edgeName && option.edgeName == option.clickTarget) {
            lineColor = 'red';
        }
        this.callStyle({strokeStyle: lineColor});
        this.ctx.stroke();
    }
    modMoveTo(p) {
        this.ctx.moveTo( this.canvasPoint(p).x, this.canvasPoint(p).y );
    }
    modLineTo(p) {
        this.ctx.lineTo( this.canvasPoint(p).x, this.canvasPoint(p).y );
    }
    style(option = {}) {
        this.ctx.strokeStyle = option.strokeStyle ?? 'black';
        this.ctx.lineWidth = option.lineWidth ?? 2;
        this.ctx.globalAlpha = 1.0;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }
    inverseMod(p) {
        p = {x: p.x / this.cw - this.org.x, y: p.y / this.cw - this.org.y};
        return p;
    }
    modFillText2(text, point, angle, offset={x:10, y:10}) {
        this.ctx.font = `${6*this.cw}px serif`;
        let pointDisplay = {x: point.x + offset.x, y: point.y + offset.y};
        pointDisplay = utl.rotatePoint(pointDisplay, angle, point);
        this.ctx.fillStyle = "black";
        this.ctx.fillText(text, this.canvasPoint(pointDisplay).x - 4*this.cw, this.canvasPoint(pointDisplay).y + 2*this.cw);
    }
    modArc(p) {
        this.ctx.beginPath();
        this.modMoveTo(p);
        this.ctx.arc(this.canvasPoint(p).x, this.canvasPoint(p).y, 100, 0 * Math.PI / 180, 45 * Math.PI / 180, false);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
    }
    drawCornerArc(point, p2, p3, angle) {
        this.ctx.beginPath();
        this.ctx.arc(this.canvasPoint(point).x, this.canvasPoint(point).y, 10*this.cw, 0, angle, false);
        this.ctx.fillStyle = "#86efac";
        this.ctx.fill();
        this.ctx.beginPath();
        this.modMoveTo(point);
        this.modLineTo( utl.pointOnLineByDistance(point, p2, 10) );
        this.modLineTo( utl.pointOnLineByDistance(point, p3, 10) );
        this.ctx.fillStyle = "#86efac";
        this.ctx.fill();
    }
    drawCornerRect(point, p2, p3) {
        let pointStart = utl.pointOnLineByDistance(point, p2, 6);
        let pointEnd   = utl.pointOnLineByDistance(point, p3, 6);
        let diff = {x: pointStart.x - point.x, y: pointStart.y - point.y}
        this.ctx.beginPath();
        this.modMoveTo( pointStart );
        this.modLineTo( {x: pointEnd.x + diff.x, y: pointEnd.y + diff.y} );
        this.modLineTo( pointEnd );
        this.ctx.strokeStyle = "#ef4444";
        this.ctx.stroke();
    }
}