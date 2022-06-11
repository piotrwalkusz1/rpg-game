import type { Component } from 'engine/core/ecs/component';
import { ArrayUtils, Type } from 'utils';

export class Entity {
  private readonly _components: Component[] = [];

  hasComponent(componentType: Type<Component>): boolean {
    return this.getComponent(componentType) !== undefined;
  }

  get components(): readonly Component[] {
    return this._components;
  }

  getComponent<T extends Component>(componentType: Type<T>): T | undefined {
    return ArrayUtils.findFirstInstanceOf(this._components, componentType);
  }

  requireComponent<T extends Component>(componentType: Type<T>): T {
    const component: T | undefined = this.getComponent(componentType);
    if (!component) {
      throw new Error('Component ' + componentType.name + ' is required');
    }
    return component;
  }

  addComponents(components: Component[]): Entity {
    components.forEach((component) => this.addComponent(component));
    return this;
  }

  addComponent(component: Component): Entity {
    this._components.push(component);
    component.entity = this;
    return this;
  }

  removeComponent(componentToRemove: Type<Component>) {
    const component = ArrayUtils.findFirstInstanceOf(this._components, componentToRemove);
    if (component !== undefined) {
      ArrayUtils.remove(this._components, component);
      component.entity = undefined;
    }
  }
}
