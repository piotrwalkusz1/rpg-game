import type { Component } from 'engine/core/ecs/component';
import { ArrayUtils, OneToManyCollection, Type } from 'utils';

export class ComponentsCollection extends OneToManyCollection<Component, Entity> {
  override getForeignKey = (component: Component) => component.entityFK;
}

export class Entity {
  readonly components: ComponentsCollection = new ComponentsCollection(this);

  hasComponent(componentType: Type<Component>): boolean {
    return this.getComponent(componentType) !== undefined;
  }

  getComponents(): readonly Component[] {
    return this.components.getArray();
  }

  getComponent<T extends Component>(componentType: Type<T>): T | undefined {
    return ArrayUtils.findFirstInstanceOf(this.getComponents(), componentType);
  }

  addComponent(component: Component): void {
    this.components.add(component);
  }
}
