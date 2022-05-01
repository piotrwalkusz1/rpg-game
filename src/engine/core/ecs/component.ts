import { areSame, OneToManyForeignKey, Type } from 'utils';
import type { ComponentsCollection, Entity } from '.';

class ComponentEntityFK extends OneToManyForeignKey<Component, ComponentsCollection, Entity> {
  override getCollection = (entity?: Entity) => entity?.components;
  override areForeignKeysEqual = areSame;
}

export abstract class Component {
  readonly entityFK: ComponentEntityFK = new ComponentEntityFK(this);

  get entity(): Entity | undefined {
    return this.entityFK.value;
  }

  getComponent<T extends Component>(componentType: Type<T>): T | undefined {
    return this.entity?.getComponent(componentType);
  }

  requireComponent<T extends Component>(componentType: Type<T>): T {
    const component: T | undefined = this.getComponent(componentType);
    if (!component) {
      throw new Error('Component ' + componentType.name + ' is required');
    }
    return component;
  }
}
