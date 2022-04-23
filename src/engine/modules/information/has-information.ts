import type { Condition, Engine } from 'engine/core/ecs';
import { EntityProvider, getEntity } from 'engine/core/ecs/model/entity-provider';
import { Information, InformationOwner } from 'engine/modules/information';

export class HasInformation implements Condition {
  constructor(private readonly entityProvider: EntityProvider, private readonly information: Information) {}

  check(_engine: Engine): boolean {
    return getEntity(this.entityProvider)?.getComponent(InformationOwner)?.hasInformation(this.information) === true;
  }
}
