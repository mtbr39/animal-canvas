class utl {
    static crossPoint(p) { // p1, p2, p3, p4 : 直線p1p2と直線p3p4の交点
        let ab1 = this.ab({p1: p.p1, p2: p.p2});
        let ab2 = this.ab({p1: p.p3, p2: p.p4});
        let x = (ab1.b - ab2.b) / (ab2.a - ab1.a);
        let y = (ab2.a * ab1.b - ab1.a * ab2.b) / (ab2.a - ab1.a);
        return {x: x, y: y};
    }
    static ab(p) { // p1, p2 : p1,p2を通る直線の傾きと切片
        let gradient = (p.p1.y - p.p2.y) / (p.p1.x - p.p2.x); // 直線の傾き
        let slice = -1 * gradient * p.p1.x + p.p1.y // 直線の切片
        return {a: gradient, b: slice};
    }
    static crossPointWithGradient(p) { // p1, p2, p3, a : 直線p1p2と、傾きaでp3を通る直線の交点
        let ab1 = this.ab({p1: p.p1, p2: p.p2});
        let ab2 = {a: p.a, b: p.p3.y - p.a * p.p3.x};
        let x = (ab1.b - ab2.b) / (ab2.a - ab1.a);
        let y = (ab2.a * ab1.b - ab1.a * ab2.b) / (ab2.a - ab1.a);
        return {x: x, y: y};
    }
    static scalePoints(points, pointsOrigin, pointsScale) {
        Object.keys(points).forEach((key)=>{
            points[key].x = (pointsOrigin.x + points[key].x) * pointsScale;
            points[key].y = (pointsOrigin.y + points[key].y) * pointsScale;
        });
    }
    static snapPoint(point, snapPoints) {
        const snapRange = 4;
        let result = point;
        snapPoints.forEach((snap) => {
            if ( this.isNearby(point, snap, snapRange) ) {
                result = snap;
            }
        });
        return result;
    }
    static isNearby(p1, p2, range) {
        let isNeaby = false;
        if (p1.x <= p2.x + range && p1.y <= p2.y + range && p1.x >= p2.x - range && p1.y >= p2.y - range) {
            isNeaby = true;
        }
        return isNeaby;
    }
    static isNearbyEdge(point, edgePoints, range) { // edgePoints = {p1, p2}
        let isNeaby = false;
        let normGradient = (-1) / this.ab(edgePoints).a;
        let crossPoint = this.crossPointWithGradient({p1:edgePoints.p1, p2:edgePoints.p2, p3:point, a:normGradient});
        let distance = this.distance(point, crossPoint);
        if ( distance < range ) {
            isNeaby = true;
        }
        return isNeaby;
    }
    static rotatePoint(point, angle, anchorPoint) {
        let rotatePoint = {x: -1, y: -1};
        let x = point.x - anchorPoint.x;
        let y = point.y - anchorPoint.y;
        rotatePoint.x = x * Math.cos(angle) + ( -1 ) * y * Math.sin(angle) + anchorPoint.x;
        rotatePoint.y = x * Math.sin(angle) +          y * Math.cos(angle) + anchorPoint.y;
        return rotatePoint;
    }
    static angleBetweenLine(p1, p2, p3, p4, isAcuteAngle = true) {
        let line1 = this.ab({p1:p1, p2:p2});
        let line2 = this.ab({p1:p3, p2:p4});
        let angle1 = Math.atan(line1.a);
        let angle2 = Math.atan(line2.a);
        let resultAngle = Math.abs( angle1 - angle2 );
        if (isAcuteAngle) {
            if (resultAngle > Math.PI/2) resultAngle = Math.PI - resultAngle;
        } else {
            if (resultAngle < Math.PI/2) resultAngle = Math.PI - resultAngle;
        }
        return resultAngle;
    }
    static angleLine(p1, p2) {
        return Math.atan2( p2.y-p1.y, p2.x-p1.x );
    }
    static edgeByPoints(p1, p2) {
        const displayEdgeRate = 0.2;
        let edgeLength = this.distance(p1, p2);
        return Math.round( edgeLength * displayEdgeRate );
    }
    static medianPoint(p1, p2) {
        return {x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2};
    }
    static distance(p1, p2) {
        return ( (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 ) ** (1/2);
    }
    static pointOnLineByDistance(p1, p2, distance) {
        let angle = this.angleLine(p1, p2);
        return this.rotatePoint({x: p1.x + distance, y: p1.y}, angle, p1);
    }
    static randomString(length = 16) {
        // let S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let S = "abcdefghijklmnopqrstuvwxyz0123456789";
        let N = length;
        return Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('');
    }
    static randomStringLikeSynbolID(alphabetLength = 6, numberLength = 9) {
        const randomStringFromLetters = (S, N) => Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('');
        const randomNaturalNumber = (start, N) => Math.floor(Math.random()*N+start);
        return [
            randomStringFromLetters("abcdefghijklmnopqrstuvwxyz", randomNaturalNumber(1,alphabetLength)),
            randomStringFromLetters("0123456789", randomNaturalNumber(0,numberLength))
        ].join('');
    }
}