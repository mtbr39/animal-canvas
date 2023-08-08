
class BackgroundObject {
    constructor(option = {}) {
        this.draw = option.drawManager;
        this.cageSize = option.cageSize;
        this.calcCanvasSize = option.calcCanvasSize;
        this.drawType = 'drawMethod';
        this.layer = 40;
        this.mainText = option.mainText || "模擬食物連鎖";

        this.draw.objects.push(this);
    }

    drawSelf() {
        this.drawBackground();
    }

    update() {

    }

    drawBackground() {
        let border = {x:this.cageSize.x, y:this.cageSize.y, w: this.cageSize.width, h: this.cageSize.height, num:24};
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

        this.draw.fillText(this.mainText, {x: this.cageSize.x, y:this.cageSize.y + this.cageSize.height/2}, {size:this.cageSize.width*0.1, color:'black', strokeWidth:'none', alpha:0.8, });
    }
}
