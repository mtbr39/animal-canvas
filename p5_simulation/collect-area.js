class CollectAreaManager {
    constructor() {
        this.collectAreaArray = [];
        this.group = new Group();
    }
    createCollectArea(options) {
        let collectArea = new CollectArea(options);
        this.collectAreaArray.push(collectArea);
        this.group.add(collectArea.sprite);
        // console.log("createCollectArea", this.group);
    }
    getTrace(collectAreaSprite) {
        let area = this.collectAreaArray.find((el) => {
            // console.log("gettraceLOOP", el);
            return el.sprite === collectAreaSprite;
        });
        // console.log("gettrace", this.collectAreaArray, collectAreaSprite, area);
        return area.trace;
    }
}
class CollectArea {
    constructor(options) {
        this.trace = options.trace || null;
        let x0 = options.x || 0;
        let y0 = options.y || 0;
        this.sprite = createSprite(x0, y0, 200, 200);
        this.sprite.depth = -10;
        this.sprite.shapeColor = color(100);
    }
}
