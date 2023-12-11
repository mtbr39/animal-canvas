export abstract class Component {}

export class PositionComponent extends Component {
  constructor(public x: number, public y: number) {
    super();
  }
}

export class SizeComponent extends Component {
  constructor(public width: number, public height: number) {
    super();
  }
}

export class VelocityComponent extends Component {
  constructor(public speedX: number, public speedY: number) {
    super();
  }
}

export class PointComponent extends Component {}

export class ColliderComponent extends Component {
  constructor(public layer: string, public collideWith: string[]) {
    super();
  }
}

export class AnimalComponent extends Component {
  constructor(public state: string = '', public stateTime: number = 0) {
    super();
  }
}

export class PathfindComponent extends Component {
  constructor(public path: Point[] = [], public achievement: number = 0) {
    super();
  }
}

export class MapComponent extends Component {
  constructor(public grid: number[][]) {
    super();
  }

  static generateMap(width: number, height: number) {
    // 壁で囲まれた空のマップを生成
    const map = [];
    for (let i = 0; i < height; i++) {
        if (i === 0 || i === height - 1) {
            // 最上段と最下段は壁
            map.push(Array(width).fill(1));
        } else {
            // 壁で囲まれた空間を作成
            map.push([1, ...Array(width - 2).fill(0), 1]);
        }
    }

    // 中にいくつかの障害物を配置
    const obstacleCount = Math.floor((width * height) / 40); // 適当な障害物の数
    for (let i = 0; i < obstacleCount; i++) {
        const obstacleX = Math.floor(Math.random() * (width - 2)) + 1; // ランダムなX座標
        const obstacleY = Math.floor(Math.random() * (height - 2)) + 1; // ランダムなY座標
        map[obstacleY][obstacleX] = 1; // 障害物を配置
    }

    return map;
  }
}