import type { Condition } from 'engine/core/ecs';
import { EntityProvider, getEntity } from 'engine/core/ecs/model/entity-provider';
import { Health } from 'engine/modules/health';

export class IsAlive implements Condition {
  constructor(private readonly entityProvider: EntityProvider) {}

  check(): boolean {
    const healthPoints: number | undefined = getEntity(this.entityProvider)?.getComponent(Health)?.healthPoints;
    return healthPoints ? healthPoints > 0 : false;
  }
}
