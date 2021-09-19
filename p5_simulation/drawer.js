class drawer {
    constructor() {
        this.objectList = [];
    }
    //登録するobjectはdraw()という名前のメソッドを持っている必要がある
    submitObject(objectHavingDrawMethod) {
        this.objectList.push(objectHavingDrawMethod);
    }
    //main.jsで呼び出す
    draw() {
        this.objectList.forEach((object) => {
            object.draw();
        });
    }
}
