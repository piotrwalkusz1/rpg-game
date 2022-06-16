import { typeName } from 'utils';
import type { GameEngine } from '../game';
import type { Condition } from './condition';
import type { ConditionChecker } from './condition-checker';

export class ConditionService {
  constructor(private conditionCheckers: ConditionChecker<Condition>[]) {}

  checkConditions(conditions: Condition[], engine: GameEngine): boolean {
    return conditions.every((condition) => this.checkCondition(condition, engine));
  }

  checkCondition(condition: Condition, engine: GameEngine): boolean {
    const conditionChecker = this.conditionCheckers.filter((checker) => condition instanceof checker.conditionType)[0];
    if (!conditionChecker) {
      throw new Error('ConditionChecker for type ' + typeName(condition) + ' not found');
    }
    return conditionChecker.check(condition, engine);
  }
}
