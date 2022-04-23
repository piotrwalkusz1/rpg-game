import type { Component } from 'engine/core/ecs/model/component';
import { ArrayUtils } from 'utils';
import { OneToManyCollection } from 'utils/cache-relationship-utils';
import type { Type } from 'utils/type';

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
