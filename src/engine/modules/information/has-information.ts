import { Condition, Engine, EntityProvider } from 'engine/core/ecs';
import type { Information } from 'engine/modules/information/information';
import { InformationOwner } from 'engine/modules/information/information-owner';

export class HasInformation implements Condition {
  constructor(private readonly entityProvider: EntityProvider, private readonly information: Information) {}

  check(_engine: Engine): boolean {
    return EntityProvider.getComponent(this.entityProvider, InformationOwner)?.hasInformation(this.information) === true;
  }
}
