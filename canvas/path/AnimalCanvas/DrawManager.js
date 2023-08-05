

class DrawManager {
    constructor(option = {}) {
        this.objects = option.objects;
        this.canvas = option.canvas;
        this.ctx = option.ctx;
        this.cw = option.cw;
        this.org = option.org;
        this.camera = {position:{x:0, y:0}, zoom:100, scrollSpeed:0.2, scrollType:-1};
        this.debugMode = false;

        this.calcCanvasSize = {width: this.canvas.width / this.cw, height: this.canvas.height / this.cw};
        this.cageSize = {width: this.canvas.width/this.cw * 0.9, height: this.canvas.height/this.cw * 0.9};
    }

    draw() {
        this.sortObjects();

        const lerp = (x, y, p) => {
            return x + (y - x) * p;
        };
        if (this.cwChanged != null) {
            this.cw = lerp(this.cw, this.cwChanged, 0.2);
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.objects.forEach( (object) => {
            this.drawObject(object);
        } );
    }
    drawObject(object) {
        switch ( object.drawType ) {
            case 'drawMethod':
                object.drawSelf();
                break;
            case undefined:
                this.circle(object.position, object.radius.value, {fillColor:object.fillColor, strokeColor:object.strokeColor, alpha:object.alpha});
                break;
            case 'sharpTriangle':
                let rotateBasePoint = {x:object.position.x,y:object.position.y + object.radius.value};
                let modDirection = object.direction - Math.PI/2;
                let p1 = utl.rotatePoint(rotateBasePoint, modDirection, object.position);
                let p2 = utl.rotatePoint(rotateBasePoint, modDirection + 0.75*Math.PI, object.position);
                let p3 = utl.rotatePoint(rotateBasePoint, modDirection - 0.75*Math.PI, object.position);
                this.drawLine(p1, p2, {color:object.fillColor, width: 8, alpha:object.alpha});
                this.drawLine(p2, p3, {color:object.fillColor, width: 8, alpha:object.alpha});
                this.drawLine(p3, p1, {color:object.fillColor, width: 8, alpha:object.alpha});
                break;
        }

        if (object.doDisplayName) {
            this.fillText(object.identifiedName, object.position, {
                offset:{x:-4, y:-10}, size:5, color:'black', strokeWidth:'none',
            });
        }
        if (this.debugMode) {
            object.colliders.forEach( (collider) => {
                this.circle(collider.position, collider.radius.value, {
                    strokeColor:'gray',
                    lineWidth:1
                })
            } );
        }
    }

    sortObjects() {
        this.objects.sort( (objectA, objectB) => {
            if (       objectA.layer > objectB.layer) {
                return -1;
            } else if (objectA.layer < objectB.layer) {
                return 1;
            } else {
                return 0;
            }
        } );
    }

    

    onMouseHoldDown(input) {
        const lerp = (x, y, p) => {
            return x + (y - x) * p;
        };
        if (input.mousePositionDelta != null) {
            this.camera.position.x += input.mousePositionDelta.x * this.camera.scrollSpeed * this.camera.scrollType;
            this.camera.position.y += input.mousePositionDelta.y * this.camera.scrollSpeed * this.camera.scrollType;
        }
    }

    onMouseWheel(input) {
        this.cwChanged = this.cw + input.wheelDelta * 0.004;
    }

    // ---- 自作描写ライブラリ ----
    canvasPoint(point) {
        return {x: (this.org.x + point.x - this.camera.position.x) * this.cw, y: (this.org.y + point.y - this.camera.position.y) * this.cw}
    }
    circle(p, radius, option={}) {
        const fillColor = option.fillColor || "#86efac";
        const strokeColor = option.strokeColor || 'none';
        const lineWidth = option.lineWidth || 4;
        const alpha = option.alpha || 1.0;
        this.ctx.beginPath();
        this.ctx.arc(this.canvasPoint(p).x, this.canvasPoint(p).y, radius*this.cw, 0, Math.PI * 2, true);
        this.style({fillStyle: fillColor, globalAlpha: alpha, strokeStyle: strokeColor, lineWidth: lineWidth});
        if (strokeColor == 'none') {
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
        
    }
    fillText(text, point, option = {}) {
        const offset = option.offset || {x:0, y:0};
        const size = option.size * this.cw || 30; // size指定時はズーム可能フォント,未指定時は固定サイズフォント
        const color = option.color || "black";
        const strokeWidth = option.strokeWidth || "none";
        const alpha = option.alpha || 1.0;
        this.ctx.font = size+"px 'M PLUS Rounded 1c',serif";
        this.style({fillStyle:color, lineWidth:strokeWidth*this.cw, globalAlpha:alpha});
        if (strokeWidth == 'none') {
            this.ctx.fillText(text, this.canvasPoint(point).x + offset.x*this.cw, this.canvasPoint(point).y + offset.y*this.cw);
        } else {
            this.ctx.strokeText(text, this.canvasPoint(point).x + offset.x*this.cw, this.canvasPoint(point).y + offset.y*this.cw);
        }
    }
    fillTextWithRotate(text, point, angle) {
        const offset = option.offset || {x:0, y:0};
        const size = option.size || 10;
        const color = option.color || "black";
        this.ctx.font = size*this.cw+"px 'M PLUS Rounded 1c',serif";
        let pointDisplay = {x: point.x + offset.x, y: point.y + offset.y};
        pointDisplay = utl.rotatePoint(pointDisplay, angle, point);
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, this.canvasPoint(pointDisplay).x - 4*this.cw, this.canvasPoint(pointDisplay).y + 2*this.cw);
    }
    drawLine(p1, p2, option = {}) {
        let color = option.color ?? 'black';
        let width = option.width ?? '2';
        let alpha = option.alpha ?? 1.0;
        this.ctx.beginPath();
        this.moveTo(p1);
        this.lineTo(p2);
        this.style({strokeStyle: color, lineWidth: width, globalAlpha: alpha});
        this.ctx.stroke();
    }
    moveTo(p) {
        this.ctx.moveTo( this.canvasPoint(p).x, this.canvasPoint(p).y );
    }
    lineTo(p) {
        this.ctx.lineTo( this.canvasPoint(p).x, this.canvasPoint(p).y );
    }
    style(option = {}) {
        this.ctx.fillStyle = option.fillStyle ?? 'black';
        this.ctx.strokeStyle = option.strokeStyle ?? 'black';
        this.ctx.lineWidth = option.lineWidth ?? 2;
        this.ctx.globalAlpha = option.globalAlpha ?? 1.0;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }
    
}


class DrawUtl {
    // ---- 以前作成したもの ----
    inverseMod(p) {
        p = {x: p.x / this.cw - this.org.x, y: p.y / this.cw - this.org.y};
        return p;
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

class BackgroundObject {
    constructor(option = {}) {
        this.draw = option.drawManager;
        this.cageSize = option.cageSize;
        this.calcCanvasSize = option.calcCanvasSize;
        this.drawType = 'drawMethod';
        this.layer = 40;

        this.draw.objects.push(this);
    }

    drawSelf() {
        this.drawBackground();
    }

    update() {

    }

    drawBackground() {
        let border = {x:this.cageSize.x, y:this.cageSize.y, w: this.cageSize.width, h: this.cageSize.height, num:16};
        // this.drawLine(this.objects[0].position, this.objects[1].position, {color:'white'});
        let color = '#C5BCB6';
        let gap = border.w/(border.num);
        let alpha = 0.5;
        for(let i=0; i<=border.num; i++) {
            let p1 = {x: border.x + gap*i, y:border.y};
            let p2 = {x: border.x + gap*i, y:border.y+border.h};
            
            this.draw.drawLine(p1,p2, {color: color, alpha: alpha});
        }
        for(let i=0; gap*i<=border.h; i++) {
            let p1 = {x: border.x, y: border.y + gap*i};
            let p2 = {x: border.x + border.w, y: border.y + gap*i};
            
            this.draw.drawLine(p1,p2, {color: color, alpha: alpha});
        }

        this.draw.fillText("模擬食物連鎖 ", {x: this.cageSize.x, y:this.cageSize.y + this.cageSize.height/2}, {size:this.cageSize.width*0.167, color:'black', strokeWidth:'none', alpha:0.8, });
    }
}