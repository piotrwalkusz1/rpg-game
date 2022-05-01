import { Condition, EntityProvider } from 'engine/core/ecs';
import { Health } from 'engine/modules/health';

export class IsAlive implements Condition {
  constructor(private readonly entityProvider: EntityProvider) {}

  check(): boolean {
    const healthPoints: number | undefined = EntityProvider.getEntity(this.entityProvider)?.getComponent(Health)?.healthPoints;
    return healthPoints ? healthPoints > 0 : false;
  }
}