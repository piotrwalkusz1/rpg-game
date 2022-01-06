import type { BattleActionExecutionContext } from './battle-action-execution-context';

export abstract class BattleAction {
  abstract execute(context: BattleActionExecutionContext): void;
}
