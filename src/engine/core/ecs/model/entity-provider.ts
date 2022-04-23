import type { Component } from 'engine/core/ecs/model/component';
import { Entity } from 'engine/core/ecs/model/entity';
import { ArrayUtils } from 'utils';

export type EntityProvider = Entity | Component;

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
