class CollectArea {
    constructor(targetGroup, options) {
        let x0 = options.x | 0;
        let y0 = options.y | 0;
        this.sprite = createSprite(x0, y0, 100, 100);
        this.sprite.shapeColor = color(100);
        this.sprite.overlap(targetGroup, function (mysprite, targetSprite) {});
    }
}
