import type { BattleAction } from '../model/battle-action';
import type { BattleActionExecutionContext } from '../model/battle-action-execution-context';

export namespace BattleService {
  export const executeAction = (action: BattleAction, context: BattleActionExecutionContext): void => {
    action.execute(context);
  };
}
