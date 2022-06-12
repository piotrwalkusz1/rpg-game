import { Condition, EntityProvider } from 'engine/core/ecs';
import { Health } from './health';

export class IsAlive implements Condition {
  constructor(private readonly entityProvider: EntityProvider) {}

  check(): boolean {
    const healthPoints: number | undefined = EntityProvider.getComponent(this.entityProvider, Health)?.healthPoints;
    return healthPoints ? healthPoints > 0 : false;
  }
}
