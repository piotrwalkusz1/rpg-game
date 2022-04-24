import type { Component } from 'engine/core/ecs/component';
import { Entity } from 'engine/core/ecs/entity';
import { ArrayUtils, Type } from 'utils';

export type EntityProvider = Entity | Component;

export namespace EntityProvider {
  export const getEntities = (entitiesProviders: EntityProvider[]): Entity[] => {
    return ArrayUtils.mapAndFilterNotNull(entitiesProviders, getEntity);
  };

  export const getEntity = (entityProvider: EntityProvider): Entity | undefined => {
    if (entityProvider instanceof Entity) {
      return entityProvider;
    } else {
      return entityProvider.entity;
    }
  };

  export const getComponent = <T extends Component>(entityProvider: EntityProvider, componentType: Type<T>): T | undefined => {
    if (entityProvider instanceof componentType) {
      return entityProvider;
    } else if (entityProvider instanceof Entity) {
      return entityProvider.getComponent(componentType);
    } else {
      return entityProvider.entity?.getComponent(componentType);
    }
  };
}
