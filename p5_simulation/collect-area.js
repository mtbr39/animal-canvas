class CollectAreaManager {
    constructor() {
        this.group = new Group();
    }
    createCollectArea(options) {
        let collectArea = new CollectArea(options);
        this.group.add(collectArea.sprite);
    }
}
class CollectArea {
    constructor(options) {
        this.caller = options.caller | null;
        let x0 = options.x | 0;
        let y0 = options.y | 0;
        this.sprite = createSprite(x0, y0, 200, 200);
        this.sprite.depth = -10;
        this.sprite.shapeColor = color(100);
        // this.sprite.overlap(targetGroup, function (mysprite, targetSprite) {});
    }
}
