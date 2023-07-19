

window.addEventListener('load', () => {

    let canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    let ctx = canvas.getContext('2d');
    
    let cw = canvas.width / 250;
    let org = {x: 0, y: 0};

    let ctx2 = new Ctx2({ctx: ctx, cw: cw, org: org});

    let points = {
        A: {x: 20, y: 80},
        B: {x: 0, y: 0}
    };

    draw();

    function draw() {
        ctx2.drawLine(points.A, points.B);
    }

    // ---- マウスイベント ----

    canvas.addEventListener('mousedown', (e) => {
        
    });

    canvas.addEventListener('mouseup', () => {

    });

    canvas.addEventListener('mousemove', (e) => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        
    });

    resizeCanvas();
    window.onresize = resizeCanvas;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx2.cw = canvas.width / 300;

        draw();
    };

})


class Ctx2 {
    constructor(option) {
        this.ctx = option.ctx;
        this.cw = option.cw;
        this.org = option.org;
    }
    vertexTransformPoint(pointRotate, pointCenter, pointRotate2, pointCenter2, pointControl, rotateProps) {
        rotateProps.angleMouse = utl.angleLine(pointCenter, pointControl);
        rotateProps.angleDiffMouse = rotateProps.angleMouse - rotateProps.angleMouseOnClick;
        rotateProps.angleMouseOnClick = rotateProps.angleMouse;
        return {point1: utl.rotatePoint(pointRotate, rotateProps.angleDiffMouse, pointCenter), point2: utl.rotatePoint(pointRotate2, rotateProps.angleDiffMouse, pointCenter2)};
    }
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
    callStyle(option = {}) {
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
    modFillText(text, point, offset={x:0, y:0}) {
        this.ctx.font = `${8*this.cw}px serif`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(text, this.canvasPoint(point).x - offset.x*this.cw, this.canvasPoint(point).y - offset.y*this.cw);
    }
    modFillText2(text, point, angle, offset={x:10, y:10}) {
        this.ctx.font = `${6*this.cw}px serif`;
        let pointDisplay = {x: point.x + offset.x, y: point.y + offset.y};
        pointDisplay = utl.rotatePoint(pointDisplay, angle, point);
        this.ctx.fillStyle = "black";
        this.ctx.fillText(text, this.canvasPoint(pointDisplay).x - 4*this.cw, this.canvasPoint(pointDisplay).y + 2*this.cw);
    }
    canvasPoint(point) {
        return {x: (this.org.x + point.x) * this.cw, y: (this.org.y + point.y) * this.cw}
    }
    modArc(p) {
        this.ctx.beginPath();
        this.modMoveTo(p);
        this.ctx.arc(this.canvasPoint(p).x, this.canvasPoint(p).y, 100, 0 * Math.PI / 180, 45 * Math.PI / 180, false);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
    }
    circle(p, radius) {
        this.ctx.beginPath();
        this.ctx.arc(this.canvasPoint(p).x, this.canvasPoint(p).y, radius*0.2*this.cw, 0, Math.PI * 2, true);
        this.ctx.fillStyle = "#86efac";
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
