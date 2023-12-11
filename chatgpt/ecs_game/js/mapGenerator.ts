export class MapGenerator {
    // static generateMap2(width: number, height: number) {
    //     // 壁で囲まれた空のマップを生成
    //     const map = [];
    //     for (let i = 0; i < height; i++) {
    //         if (i === 0 || i === height - 1) {
    //             // 最上段と最下段は壁
    //             map.push(Array(width).fill(1));
    //         } else {
    //             // 壁で囲まれた空間を作成
    //             map.push([1, ...Array(width - 2).fill(0), 1]);
    //         }
    //     }

    //     // 中にいくつかの障害物を配置
    //     const obstacleCount = Math.floor((width * height) / 40); // 適当な障害物の数
    //     for (let i = 0; i < obstacleCount; i++) {
    //         const obstacleX = Math.floor(Math.random() * (width - 2)) + 1; // ランダムなX座標
    //         const obstacleY = Math.floor(Math.random() * (height - 2)) + 1; // ランダムなY座標
    //         map[obstacleY][obstacleX] = 1; // 障害物を配置
    //     }

    //     return map;
    // }

    static run(width: number, height: number) {
        // 壁で埋めた空のマップを生成
        const map = [];
        for (let i = 0; i < height; i++) {
            const row = Array(width).fill(1); // 全て壁で埋める
            map.push(row);
        }

        // 矩形の空洞を作成
        const minRectSize = Math.floor(Math.min(width, height) / 4); // 空洞の最小サイズ
        const maxRectSize = Math.floor(Math.min(width, height) / 2); // 空洞の最大サイズ

        const rectWidth = Math.floor(Math.random() * (maxRectSize - minRectSize + 1)) + minRectSize; // 空洞の幅
        const rectHeight = Math.floor(Math.random() * (maxRectSize - minRectSize + 1)) + minRectSize; // 空洞の高さ

        const startX = Math.floor(Math.random() * (width - rectWidth)); // 空洞の開始X座標
        const startY = Math.floor(Math.random() * (height - rectHeight)); // 空洞の開始Y座標

        for (let i = startY; i < startY + rectHeight; i++) {
            for (let j = startX; j < startX + rectWidth; j++) {
                map[i][j] = 0; // 空洞を作成
            }
        }

        // 中央の壁を作成
        const wallX = startX + 2;
        const wallY = startY + 2;
        const wallWidth = rectWidth - 4;
        const wallHeight = rectHeight - 4;

        for (let i = wallY; i < wallY + wallHeight; i++) {
            for (let j = wallX; j < wallX + wallWidth; j++) {
                map[i][j] = 1; // 中央の壁を作成
            }
        }

        // 上下左右4つの部屋
        for (let i = startY - 2; i > 0; i--) {
            for (let j = startX; j < startX + rectWidth; j++) {
                map[i][j] = 0; // 空洞を作成
            }
        }
        for (let i = startY + rectHeight + 1; i < height - 1; i++) {
            for (let j = startX; j < startX + rectWidth; j++) {
                map[i][j] = 0; // 空洞を作成
            }
        }
        for (let i = startY; i < startY + rectHeight; i++) {
            for (let j = 1; j < startX - 1; j++) {
                map[i][j] = 0; // 空洞を作成
            }
        }
        for (let i = startY; i < startY + rectHeight; i++) {
            for (let j = startX + rectWidth + 1; j < width - 1; j++) {
                map[i][j] = 0; // 空洞を作成
            }
        }

        //ドア
        map[startY - 1][startX + Math.floor(rectWidth * Math.random())] = 0;
        map[startY - 1][startX + Math.floor(rectWidth * Math.random())] = 0; //上のドアだけ2個
        map[startY + rectHeight][startX + Math.floor(rectWidth * Math.random())] = 0;
        map[startY + Math.floor(rectHeight * Math.random())][startX - 1] = 0;
        map[startY + Math.floor(rectHeight * Math.random())][startX + rectWidth] = 0;

        // 上下左右の部屋の中心座標を取得
        const upRoomCenter = { x: startX + Math.floor(rectWidth / 2), y: Math.floor(startY / 2) }; // 上
        const downRoomCenter = { x: startX + Math.floor(rectWidth / 2), y: startY + rectHeight + Math.floor((height - startY - rectHeight) / 2) }; // 下
        const leftRoomCenter = { x: Math.floor(startX / 2), y: startY + Math.floor(rectHeight / 2) }; // 左
        const rightRoomCenter = { x: startX + rectWidth + Math.floor((width - startX - rectWidth) / 2), y: startY + Math.floor(rectHeight / 2) }; // 右
        const roomCenters = [upRoomCenter, downRoomCenter, leftRoomCenter, rightRoomCenter];

        return [map, roomCenters];
    }

    static convertPointToCenterPoint(point: Point, gridSize: number): Point {
        const halfGridSize = gridSize / 2;
        return {
            x: (point.x * gridSize) + halfGridSize,
            y: (point.y * gridSize) + halfGridSize,
        };
    }

    static run2(width: number, height: number) {
        // 0で埋めた空のマップを生成
        const map = [];
        for (let i = 0; i < height; i++) {
            const row = Array(width).fill(0); // すべてのセルを0で初期化
            map.push(row);
        }
        // surroundWithWalls(map, startX, startY, width, height);
        return map;
    }

    static surroundWithWalls(map: number[][], startX: number, startY: number, width: number, height: number) {
        const endX = startX + width - 1;
        const endY = startY + height - 1;
    
        // 上の壁を設定
        for (let i = startX; i <= endX; i++) {
            map[startY][i] = 1;
        }
    
        // 下の壁を設定
        for (let i = startX; i <= endX; i++) {
            map[endY][i] = 1;
        }
    
        // 左の壁を設定
        for (let i = startY; i <= endY; i++) {
            map[i][startX] = 1;
        }
    
        // 右の壁を設定
        for (let i = startY; i <= endY; i++) {
            map[i][endX] = 1;
        }
    
        return map;
    }
    
}
