import type { ActionExecutionContext } from '../model/action-execution-context';
import type { ActionExecutionResult } from '../model/action-execution-result';
import type { Action } from '../model/actions/action';

export namespace ActionExecutionService {
  export const execute = (action: Action, actionExecutionContext: ActionExecutionContext): ActionExecutionResult => {
    action.execute(actionExecutionContext);
    return { type: 'SUCCESS' };
  };
}
