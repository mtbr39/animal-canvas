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
