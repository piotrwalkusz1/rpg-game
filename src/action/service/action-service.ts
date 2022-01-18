import { DetectorService } from '../../detector/service/detector-service';
import type { GameContext } from '../../game/model/game-context';
import { ExecuteActionGameEvent } from '../../game/model/game-events/execute-action-game-event';
import { WaitingAfterActionEndGameEvent } from '../../game/model/game-events/waiting-after-action-end-game-event';
import type { Action } from '../model/action';
import type { ActionExecutionResult } from '../model/action-execution-result';
import { CharacterAction, CharacterActionScheduledEvent } from '../model/character-action';

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
    context.addGameEvent(new ExecuteActionGameEvent({ time: context.getCurrentTimePlusDuration(action.duration), action }));
    return { type: 'SUCCESS' };
  };

  export const executeAction = (action: Action, context: GameContext): void => {
    action.execute(context);
    if (action instanceof CharacterAction) {
      context.addGameEvent(
        new WaitingAfterActionEndGameEvent({
          time: context.getCurrentTimePlusDuration(action.waitingAfterAction),
          character: action.character
        })
      );
    }
  };
}
