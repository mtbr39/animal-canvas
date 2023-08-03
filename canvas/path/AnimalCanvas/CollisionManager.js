

class CollisionManager {
    constructor(option = {}) {
        this.objects = option.objects || {};

    }

    check() {
        let checkObjects = this.objects.filter( (object) => {
            return typeof object.colliders != 'undefined';
        } );
        checkObjects.forEach( (targetObject) => {
        checkObjects.forEach( (checkObject)  => {
            if (targetObject.id !== checkObject.id) {
                targetObject.colliders.forEach( (targetCollider) => {
                checkObject.colliders.forEach(  (checkCollider)  => {
                    if ( CollisionManager.isOverlappedCircle( targetCollider, checkCollider ) ) {
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
        if ( this.distance(circle1.position, circle2.position) <= circle1.radius.value + circle2.radius.value ) {
            isOverlapped = true;
        }
        return isOverlapped;

    }
    static distance(p1, p2) {
        return ( (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 ) ** (1/2);
    }
}
