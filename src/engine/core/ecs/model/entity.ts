import type { Component } from 'engine/core/ecs/model/component';
import { ArrayUtils } from 'utils';

export class Entity {
  private readonly components: Component[] = [];

  getComponent<T extends Component>(componentType: abstract new (...args: any[]) => T): T | undefined {
    return ArrayUtils.findFirstInstanceOf(this.components, componentType);
  }

  addComponent(component: Component): void {
    this.components.push(component);
  }
}
