import { Component } from './component';

export class Entity {
  components: Record<string, Component>;

  constructor() {
    this.components = {};
  }
}
