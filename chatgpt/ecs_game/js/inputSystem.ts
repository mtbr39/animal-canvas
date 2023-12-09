import { Entity } from './entity';
import { System } from './system';
import { VelocityComponent } from './component';

export class InputSystem {
  constructor(private player: Entity) {
    window.addEventListener('keydown', this.handleKeydown.bind(this));
    window.addEventListener('keyup', this.handleKeyup.bind(this));
  }

  private handleKeydown(event: KeyboardEvent) {
    const velocity = this.player.components.VelocityComponent as VelocityComponent;

    switch (event.key) {
      case 'w':
        velocity.speedY = -5;
        break;
      case 'a':
        velocity.speedX = -5;
        break;
      case 's':
        velocity.speedY = 5;
        break;
      case 'd':
        velocity.speedX = 5;
        break;
    }
  }

  private handleKeyup(event: KeyboardEvent) {
    const velocity = this.player.components.VelocityComponent as VelocityComponent;

    switch (event.key) {
      case 'w':
      case 's':
        velocity.speedY = 0;
        break;
      case 'a':
      case 'd':
        velocity.speedX = 0;
        break;
    }
  }
}
