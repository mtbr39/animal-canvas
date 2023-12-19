import { Entity } from "../entity";

export abstract class Component {}


// // Problem :  window[componentName]
// export function setComponent(entity: any, componentName: string, args: any[]) {
//     if (
//         typeof componentName === 'string'
//     ) {
//         //@ts-ignore
//         if (window[componentName]) {
//             //@ts-ignore
//             entity.components[componentName] = new window[componentName](...args);
//         } else {
//             // Handle unknown components or do nothing
//             console.log("window[componetName]が存在しない", window);
//         }
//     } else {
//         // Handle unknown components or do nothing
//         console.log("componentNameがstringでない");
//     }
// }

// export function setMultipleComponents(entity: any, components: { [key: string]: any[] }) {
//     for (let componentName in components) {
//         if (Object.prototype.hasOwnProperty.call(components, componentName)) {
//             setComponent(entity, componentName, components[componentName]);
//         }
//     }
// }

// export function createEntityWithComponents(components: { [key: string]: any[] }): Entity {
//     const entity = new Entity();
//     setMultipleComponents(entity, components);
//     return entity;
// }


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

export class ShapeComponent extends Component {
    constructor(public type: ShapeType, public color: string, public isFill: boolean = true) {
        super();
    }
}

export class PlayerComponent extends Component {}

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
    constructor(public grid: number[][], public centers: Point[] = []) {
        super();
    }
}
