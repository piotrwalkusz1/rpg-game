import { DetectorService } from '../../detector/service/detector-service';
import { ExecuteActionTimeEvent } from '../../time/model/time-events/execute-action-time-event';
import { WaitingAfterActionEndTimeEvent } from '../../time/model/time-events/waiting-after-action-end-time-event';
import type { Action } from '../model/action';
import type { ActionExecutionResult } from '../model/action-execution-result';
import { CharacterAction, CharacterActionScheduledEvent } from '../model/character-action';
import type { GameContext } from '../../game/model/game-context';

export namespace ActionService {
  export const scheduleAction = (action: Action, context: GameContext): ActionExecutionResult => {
    const scheduledEvent = action.getActionScheduledEvent(context);
    if (action instanceof CharacterAction && scheduledEvent instanceof CharacterActionScheduledEvent) {
      const character = action.character;
      if (character === context.getPlayerCharacter()) {
        DetectorService.runDetectors(scheduledEvent);
        if (scheduledEvent.preventionNarrationDescription) {
          return { type: 'PREVENTION', description: scheduledEvent.preventionNarrationDescription };
        }
      }
      character.currentAction = action;
    }
    context.addTimeEvent(new ExecuteActionTimeEvent({ time: context.getCurrentTimePlusDuration(action.duration), action }));
    return { type: 'SUCCESS' };
  };

  export const executeAction = (action: Action, context: GameContext): void => {
    action.execute(context);
    if (action instanceof CharacterAction) {
      context.addTimeEvent(
        new WaitingAfterActionEndTimeEvent({
          time: context.getCurrentTimePlusDuration(action.waitingAfterAction),
          character: action.character
        })
      );
    }
  };
}
