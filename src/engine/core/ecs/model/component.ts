import type { ComponentsCollection, Entity } from 'engine/core/ecs';
import { OneToManyForeignKey } from 'utils/cache-relationship-utils';
import { areSame } from 'utils/object-utils';
import type { Type } from 'utils/type';

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
}
