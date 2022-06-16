import { ConditionChecker } from 'engine/core/condition';
import type { Type } from 'utils';
import { IsAlive } from './is-alive';

export class IsAliveChecker extends ConditionChecker<IsAlive> {
  override get conditionType(): Type<IsAlive> {
    return IsAlive;
  }

  override check(condition: IsAlive): boolean {
    return condition.health ? condition.health.healthPoints > 0 : false;
  }
}
