import { Component } from './component/component';

export class Entity {
  components: Record<string, Component>;

  constructor() {
    this.components = {};
  }

  addComponent(componentName: string, component: Component): void {
    this.components[componentName] = component;
  }
}
