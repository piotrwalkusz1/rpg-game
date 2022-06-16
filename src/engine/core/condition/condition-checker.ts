import type { Type } from 'utils';
import type { GameEngine } from '../game';
import type { Condition } from './condition';

export abstract class ConditionChecker<T extends Condition> {
  abstract get conditionType(): Type<T>;

  abstract check(condition: T, engine: GameEngine): boolean;
}
