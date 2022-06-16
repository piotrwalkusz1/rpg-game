import type { Condition } from 'engine/core/condition';
import { Entity, EntityProvider } from 'engine/core/ecs';
import type { Information } from 'engine/modules/information/information';

export class HasInformation implements Condition {
  readonly entity: Entity;
  readonly information: Information;

  constructor(entityProvider: EntityProvider, information: Information) {
    this.entity = EntityProvider.getEntity(entityProvider);
    this.information = information;
  }
}
