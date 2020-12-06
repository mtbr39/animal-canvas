const BezierCurve = class BezierCurve {
    constructor(optionsParam) {
        const options = optionsParam || {};
        this.tension = options.tension || 0.4;

        this.color1 = options.color1 || '#36DFE7';
        this.color2 = options.color2 || '#8F17E1';
        this.color3 = options.color3 || '#E509E6';
        this.layers = [
            {
                points: []
            }
        ];

        this.canvas = options.canvas || document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.wrapperElement = options.wrapperElement || document.body;
        if (!this.canvas.parentElement) {
            this.wrapperElement.append(this.canvas);
        }

        this.init();
        this.onceUpdate();
        this.draw();
    }

    distance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    onceUpdate() {
        for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
            //
            const layer = this.layers[layerIndex];
            const points = layer.points;
            //
            for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
                const prev = points[(pointIndex + points.length - 1) % points.length];
                const point = points[pointIndex];
                const next = points[(pointIndex + points.length + 1) % points.length];
                const dPrev = this.distance(point, prev);
                const dNext = this.distance(point, next);

                const line = {
                    x: next.x - prev.x,
                    y: next.y - prev.y
                };

                const dLine = Math.sqrt(line.x * line.x + line.y * line.y);

                console.log("preupdate", line, dLine, dPrev, this.tension);
                point.cPrev = {
                    x: point.x - line.x / dLine * dPrev * this.tension,
                    y: point.y - line.y / dLine * dPrev * this.tension
                };

                point.cNext = {
                    x: point.x + line.x / dLine * dNext * this.tension,
                    y: point.y + line.y / dLine * dNext * this.tension
                };
                console.log("update", points);
            }
        }
    }

    draw() {
        //
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
            const layer = this.layers[layerIndex];
            const points = layer.points;
            this.context.fillStyle = 'blue';

            //
            this.context.beginPath();
            this.context.moveTo(points[0].x, points[0].y);
            for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
                this.context.bezierCurveTo(
                    points[(pointIndex + 0) % points.length].cNext.x,
                    points[(pointIndex + 0) % points.length].cNext.y,
                    points[(pointIndex + 1) % points.length].cPrev.x,
                    points[(pointIndex + 1) % points.length].cPrev.y,
                    points[(pointIndex + 1) % points.length].x,
                    points[(pointIndex + 1) % points.length].y);
                console.log("draw", points);

            }
        }
        //

        this.context.fill();
    }

    createPoint(x, y) {
        return {
            x: x,
            y: y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0
        };
    }

    init() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
            const layer = this.layers[layerIndex];
            const points = [];

            points.push(this.createPoint(100, 100));
            points.push(this.createPoint(200, 200));
            points.push(this.createPoint(300, 400));
            points.push(this.createPoint(400, 200));
            points.push(this.createPoint(600, 300));

            layer.points = points;
        }

    }
}



let curve = new BezierCurve();
console.log("bezier play;");

