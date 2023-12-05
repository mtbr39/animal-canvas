// ウィンドウの幅と高さを取得
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

// Canvas要素をウィンドウサイズに合わせて作成
var canvas = document.createElement("canvas");
canvas.width = windowWidth;
canvas.height = windowHeight;
document.body.appendChild(canvas);

// Paper.jsでキャンバスをセットアップ
paper.setup(canvas);

// 背景を黒で塗りつぶす
var background = new paper.Path.Rectangle({
    point: [0, 0],
    size: [windowWidth, windowHeight],
    fillColor: "black",
});

// ボタンのスタイルと位置を指定
var buttonWidth = 160;
var buttonHeight = 40;
var buttonPosition = new paper.Point(20, 20);
var cornerSize = new paper.Size(10, 10);

// ボタンの外枠
var buttonRect = new paper.Path.Rectangle({
    point: buttonPosition,
    size: new paper.Size(buttonWidth, buttonHeight),
    radius: cornerSize,
    fillColor: 'lightgray',
    strokeColor: 'black',
    strokeWidth: 2,
});

// ボタン内のテキスト
var textX = buttonPosition.x + 10; // X座標を計算
var textY = buttonPosition.y + 25; // Y座標を計算
var buttonText = new paper.PointText(new paper.Point(textX, textY)); // テキストの座標を設定
buttonText.content = 'Line Mode: OFF'; // テキストの内容を設定
buttonText.fillColor = 'black';
buttonText.fontSize = 14;

// ボタングループに追加
var buttonGroup = new paper.Group([buttonRect, buttonText]);
buttonGroup.onClick = function(event) {
    isLineMode = !isLineMode;
    buttonText.content = isLineMode ? 'Line Mode: ON' : 'Line Mode: OFF';
};

// 作成する矩形の数
var numberOfRectangles = 5;
var rectangles = [];

for (var i = 0; i < numberOfRectangles; i++) {
    var rectangle = new paper.Path.Rectangle({
        point: [windowWidth * 0.1 + i * 50, windowHeight * 0.1 + i * 50], // 位置を変更
        size: [windowWidth * 0.4, windowHeight * 0.3],
        strokeColor: "white",
        strokeWidth: 4,
        fillColor: "black",
    });

    rectangle.onMouseDown = function (event) {


        if (isLineMode) {
            if (!lineStart) {
                lineStart = this.position;
            } else {
                var line = new paper.Path.Line({
                    from: lineStart,
                    to: this.position,
                    strokeColor: 'red',
                    strokeWidth: 2,
                });
                lines.push(line);
                lineStart = null;
            }
        } else {
            this.isDragging = true;
            this.dragPoint = event.point.subtract(this.position);
        }
    };

    rectangle.onMouseDrag = function (event) {
        if (this.isDragging) {
            this.position = event.point.subtract(this.dragPoint);
        }
    };

    rectangle.onMouseUp = function (event) {
        this.isDragging = false;
        this.dragPoint = null;
    };

    // 矩形を配列に追加
    rectangles.push(rectangle);
}

var isLineMode = false;
var lineStart = null;
var lines = [];

// 線で矩形を結ぶモードを切り替えるボタン
var modeButton = document.createElement('button');
modeButton.textContent = 'Line Mode: OFF';
modeButton.onclick = function() {
    isLineMode = !isLineMode;
    modeButton.textContent = isLineMode ? 'Line Mode: ON' : 'Line Mode: OFF';
};

// HTMLにボタンを追加
document.body.appendChild(modeButton);

// 作成する矩形の数
var numberOfRectangles = 5;
var rectangles = [];

// for (var i = 0; i < numberOfRectangles; i++) {
//     var rectangle = new paper.Path.Rectangle({
//         point: [windowWidth * 0.1 + i * 50, windowHeight * 0.1 + i * 50],
//         size: [windowWidth * 0.4, windowHeight * 0.3],
//         strokeColor: "white",
//         strokeWidth: 4,
//         fillColor: "black",
//     });

//     rectangle.onMouseDown = function (event) {
//         if (isLineMode) {
//             if (!lineStart) {
//                 lineStart = this.position;
//             } else {
//                 var line = new paper.Path.Line({
//                     from: lineStart,
//                     to: this.position,
//                     strokeColor: 'red',
//                     strokeWidth: 2,
//                 });
//                 lines.push(line);
//                 lineStart = null;
//             }
//         }
//     };

//     rectangles.push(rectangle);
// }


// 描画
paper.view.draw();
