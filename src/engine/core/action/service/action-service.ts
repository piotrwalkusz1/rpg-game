import { DetectorService } from '../../detector/service/detector-service';
import type { GameContext } from '../../game/model/game-context';
import { ExecuteActionGameEvent } from '../../game/model/game-events/execute-action-game-event';
import type { Action } from '../model/action';
import type { ActionExecutionResult } from '../model/action-execution-result';
import type { ActionScheduleResult } from '../model/action-schedule-result';
import { CharacterAction, CharacterActionScheduledEvent } from '../model/character-action';
import { PendingAction } from '../model/pending-action';

export namespace ActionService {
  export const scheduleAction = (action: Action, context: GameContext): ActionScheduleResult => {
    if (action instanceof CharacterAction && (action.character.pendingAction || !action.canExecute(context))) {
      return { type: 'CANNOT_EXECUTE' };
    }
    const scheduledEvent = action.getActionScheduledEvent(context);
    DetectorService.runDetectors(scheduledEvent, context);
    const executionEvent = new ExecuteActionGameEvent({ time: context.getCurrentTimePlusDuration(action.duration), action });
    if (action instanceof CharacterAction && scheduledEvent instanceof CharacterActionScheduledEvent) {
      const character = action.character;
      if (character === context.player) {
        if (scheduledEvent.preventionNarrationDescription) {
          return { type: 'PREVENTION', description: scheduledEvent.preventionNarrationDescription };
        }
      }
      character.pendingAction = new PendingAction({ action, scheduleTime: context.currentTime, executionEvent });
    }
    context.addGameEvent(executionEvent);
    return { type: 'SUCCESS' };
  };

  export const executeAction = async (action: Action, context: GameContext): Promise<ActionExecutionResult> => {
    if (action instanceof CharacterAction) {
      if (action.character.pendingAction?.action !== action || !action.canExecute(context)) {
        return { type: 'CANNOT_EXECUTE' };
      }
    }
    const executionResult = await action.execute(context);
    DetectorService.runDetectors(executionResult, context);
    return { type: 'SUCCESS' };
  };
}
