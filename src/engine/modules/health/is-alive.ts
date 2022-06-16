import type { Condition } from 'engine/core/condition';
import { EntityProvider } from 'engine/core/ecs';
import { Health } from './health';

export class IsAlive implements Condition {
  readonly health: Health | undefined;

  constructor(entityProvider: EntityProvider) {
    this.health = EntityProvider.getComponent(entityProvider, Health);
  }
}
