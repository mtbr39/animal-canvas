class Pathfinding {
    static generateRandomMap(rows, cols, wallProbability) {
        const map = [];
        for (let i = 0; i < rows; i++) {
            map[i] = [];
            for (let j = 0; j < cols; j++) {
                map[i][j] = Math.random() > wallProbability ? 1 : 0;
            }
        }
        return map;
    }
    static findPath(start, end, map, cellWidth, cellHeight) {
        const openList = [
            {
                x: start.x,
                y: start.y,
                g: 0,
                h: Math.abs(end.x - start.x) + Math.abs(end.y - start.y),
                parent: null,
            },
        ];
        const closedList = [];

        while (openList.length > 0) {
            openList.sort((a, b) => a.g + a.h - (b.g + b.h));
            const current = openList.shift();

            if (current.x === end.x && current.y === end.y) {
                const path = [];
                let temp = current;
                while (temp !== null) {
                    path.unshift({ x: temp.x, y: temp.y });
                    temp = temp.parent;
                }
                return path;
            }

            closedList.push(current);

            // 上下左右の移動
            const neighbors = [
                { x: current.x, y: current.y - 1 },
                { x: current.x, y: current.y + 1 },
                { x: current.x - 1, y: current.y },
                { x: current.x + 1, y: current.y },
            ];

            for (const neighbor of neighbors) {
                if (
                    neighbor.x < 0 ||
                    neighbor.x >= map[0].length ||
                    neighbor.y < 0 ||
                    neighbor.y >= map.length ||
                    map[neighbor.y][neighbor.x] === 1 ||
                    closedList.some(
                        (node) => node.x === neighbor.x && node.y === neighbor.y
                    )
                ) {
                    continue;
                }

                const g = current.g + 1;
                const h =
                    Math.abs(end.x - neighbor.x) + Math.abs(end.y - neighbor.y);
                const inOpenList = openList.some(
                    (node) => node.x === neighbor.x && node.y === neighbor.y
                );

                if (!inOpenList || g < current.g) {
                    const newNode = {
                        x: neighbor.x,
                        y: neighbor.y,
                        g,
                        h,
                        parent: current,
                    };
                    if (!inOpenList) {
                        openList.push(newNode);
                    }
                }
            }
        }

        return null;
    }

    static drawMap(ctx, map, cellWidth, cellHeight) {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x] === 1) {
                    ctx.fillStyle = "black";
                } else {
                    ctx.fillStyle = "white";
                }
                ctx.fillRect(
                    x * cellWidth,
                    y * cellHeight,
                    cellWidth,
                    cellHeight
                );
            }
        }
    }

    static drawPath(ctx, path, start, end, cellWidth, cellHeight) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(
            start.x * cellWidth + cellWidth / 2,
            start.y * cellHeight + cellHeight / 2
        );
        for (const { x, y } of path) {
            ctx.lineTo(
                x * cellWidth + cellWidth / 2,
                y * cellHeight + cellHeight / 2
            );
        }
        ctx.lineTo(
            end.x * cellWidth + cellWidth / 2,
            end.y * cellHeight + cellHeight / 2
        );
        ctx.stroke();
    }

    static init(canvas, start, end, map, cellWidth, cellHeight) {
        const ctx = canvas.getContext("2d");
        this.drawMap(ctx, map, cellWidth, cellHeight);
        const path = this.findPath(start, end, map, cellWidth, cellHeight);
        if (path !== null) {
            this.drawPath(ctx, path, start, end, cellWidth, cellHeight);
        } else {
            console.log("No path found");
        }
    }
}

class MovingRect {
    static cellSize = 40;
  
    static moveRect(ctx, map, currentPosition) {
      const possibleMoves = [];
  
      if (currentPosition.x > 0 && map[currentPosition.y][currentPosition.x - 1] !== 1) {
        possibleMoves.push({ x: -1, y: 0 }); // 左に移動可能
      }
      if (currentPosition.x < map[0].length - 1 && map[currentPosition.y][currentPosition.x + 1] !== 1) {
        possibleMoves.push({ x: 1, y: 0 }); // 右に移動可能
      }
      if (currentPosition.y > 0 && map[currentPosition.y - 1][currentPosition.x] !== 1) {
        possibleMoves.push({ x: 0, y: -1 }); // 上に移動可能
      }
      if (currentPosition.y < map.length - 1 && map[currentPosition.y + 1][currentPosition.x] !== 1) {
        possibleMoves.push({ x: 0, y: 1 }); // 下に移動可能
      }
  
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        currentPosition.x += randomMove.x;
        currentPosition.y += randomMove.y;
      }
      for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
          if (map[y][x] === 1) {
            ctx.fillStyle = "black";
          } else {
            ctx.fillStyle = "white";
          }
          ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
  
      ctx.fillStyle = "black";
      ctx.fillRect(currentPosition.x * this.cellSize, currentPosition.y * this.cellSize, this.cellSize, this.cellSize);
    }
  }

class MovingRectManager {
    static _rectangles = [];
  
    static get rectangles() {
      return this._rectangles;
    }
  
    static addRect(rect) {
      this._rectangles.push(rect);
    }
  
    static moveAll(ctx, map) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (const rect of this._rectangles) {
        MovingRect.moveRect();
      }
    }
  }

class UpdateManager {
    static lastFrameTime = 0;
    static updateFunctions = [];

    static add(func) {
        this.updateFunctions.push(func);
    }

    static update(ctx, map) {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;
        const interval = 1000 / 60; // 60FPSの場合の1フレームの時間（ミリ秒）

        if (deltaTime > interval) {
            this.updateFunctions.forEach((func) => func(map));
            this.lastFrameTime = currentTime - (deltaTime % interval);
        }

        requestAnimationFrame(() => this.update(ctx, map));
    }
}

// 使用例
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const start = { x: 0, y: 0 };
const end = { x: 9, y: 9 };
const rows = 10;
const cols = 10;
const wallProbability = 0.8;
const map = Pathfinding.generateRandomMap(rows, cols, wallProbability);
const cellWidth = 20;
const cellHeight = 20;

Pathfinding.init(canvas, start, end, map, cellWidth, cellHeight);

// MovingRect.startMoving(ctx, map);

console.log("ctx",ctx);
UpdateManager.add((ctx) => {
    console.log("ctx2",ctx);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
});




MovingRectManager.addRect({x:2,y:2});
UpdateManager.add(MovingRectManager.moveAll);

UpdateManager.update(ctx, map);
