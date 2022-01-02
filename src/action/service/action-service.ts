import { DetectorService } from '../../detector/service/detector-service';
import type { ActionExecutionContext } from '../model/action-execution-context';
import type { ActionExecutionResult } from '../model/action-execution-result';
import type { Action } from '../model/actions/action';

export namespace ActionService {
  export const executeAction = (action: Action, actionExecutionContext: ActionExecutionContext): ActionExecutionResult => {
    const actionScheduledEvent = action.getActionScheduledEvent(actionExecutionContext);
    if (actionScheduledEvent) {
      DetectorService.runDetectors(actionScheduledEvent);
      if (actionScheduledEvent.preventionNarrationDescription) {
        return { type: 'PREVENTION', description: actionScheduledEvent.preventionNarrationDescription };
      }
    }
    action.execute(actionExecutionContext);
    return { type: 'SUCCESS' };
  };
}
