import { Component } from 'engine/core/ecs/component';
import { ArrayUtils, Type } from 'utils';
import type { EntityEventListener } from './entity-event-listener';

export class Entity {
  private readonly _components: Component[] = [];
  private readonly _eventListeners: EntityEventListener[] = [];

  get components(): readonly Component[] {
    return this._components;
  }

  getComponent<T extends Component>(componentType: Type<T>): T | undefined {
    return ArrayUtils.findFirstInstanceOf(this._components, componentType);
  }

  getOrAddComponent<T extends Component>(componentType: Type<T>, componentConstructor: () => T): T {
    let component = this.getComponent(componentType);
    if (component) {
      return component;
    }
    component = componentConstructor();
    this.addComponent(component);
    return component;
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

  removeComponent(componentToRemove: Component | Type<Component>) {
    const component =
      componentToRemove instanceof Component ? componentToRemove : ArrayUtils.findFirstInstanceOf(this._components, componentToRemove);
    if (component !== undefined) {
      ArrayUtils.removeFirst(this._components, component);
      component.entity = undefined;
    }
  }

  get eventListeners(): readonly EntityEventListener[] {
    return this._eventListeners;
  }

  addEventListener(eventListener: EntityEventListener): void {
    this._eventListeners.push(eventListener);
  }

  removeEventListener(eventListener: EventListener): void {
    ArrayUtils.removeFirst(this._eventListeners, eventListener);
  }
}
