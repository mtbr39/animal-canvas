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
    constructor(public state: string = "", public stateTime: number = 0) {
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
}
