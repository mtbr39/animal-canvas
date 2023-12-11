function findPath(map: number[][], start: Point, goal: Point): Point[] | null {
    const numRows = map.length;
    const numCols = map[0].length;

    if (
        start.x < 0 ||
        start.x >= numCols ||
        start.y < 0 ||
        start.y >= numRows ||
        goal.x < 0 ||
        goal.x >= numCols ||
        goal.y < 0 ||
        goal.y >= numRows ||
        map[start.y][start.x] !== 0 ||
        map[goal.y][goal.x] !== 0
    ) {
        return null; // スタート地点や目的地がマップ外にあるか、壁にある場合は経路は見つからない
    }

    const visited: boolean[][] = [];
    for (let i = 0; i < numRows; i++) {
        visited.push(new Array(numCols).fill(false));
    }

    const queue: Point[] = [];
    const parents: { [key: string]: Point | null } = {};
    queue.push(start);
    visited[start.y][start.x] = true;

    const directions: Point[] = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
    ];

    while (queue.length > 0) {
        const current = queue.shift()!;
        if (current.x === goal.x && current.y === goal.y) {
            const path: Point[] = [];
            let node: Point | null = goal;
            while (node) {
                path.unshift(node);
                node = parents[`${node.x},${node.y}`];
            }
            return path;
        }

        for (const direction of directions) {
            const nextX = current.x + direction.x;
            const nextY = current.y + direction.y;

            if (
                nextX >= 0 &&
                nextX < numCols &&
                nextY >= 0 &&
                nextY < numRows &&
                map[nextY][nextX] === 0 &&
                !visited[nextY][nextX]
            ) {
                queue.push({ x: nextX, y: nextY });
                visited[nextY][nextX] = true;
                parents[`${nextX},${nextY}`] = current;
            }
        }
    }

    return null; // 目的地までの経路が見つからなかった
}

export function convertPathToCenterPoints(path: Point[], gridSize: number): Point[] {
    const halfGridSize = gridSize / 2;
    return path.map(point => ({
        x: (point.x * gridSize) + halfGridSize,
        y: (point.y * gridSize) + halfGridSize,
    }));
}

export function findAndConvertPath(map: number[][], start: Point, goal: Point, gridSize: number): Point[] | null {
    const path = findPath(map, start, goal); // 最初の関数で経路を見つける
    if (!path) {
        return null;
    }

    const centerPath = convertPathToCenterPoints(path, gridSize); // 2番目の関数でマスの中心に変換する
    return centerPath;
}