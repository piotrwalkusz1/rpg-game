import type { NarrationAction } from '../../narration/model/narration-actions/narration-action';
import { NarrationService } from '../../narration/service/narration-service';
import type { GameContext } from '../model/game-context';

export namespace GameLoopService {
  export const processNextEvent = (context: GameContext): void => {
    const event = context.popNextGameEvent();
    if (!event) {
      return;
    }
    context.currentTime = event.time;
    event.process(context);
    executePlayerTurnAutomaticallyAndProcessNextEventIfPlayerActionIsNotRequired(context);
  };

  export const executePlayerTurn = (narrationAction: NarrationAction, context: GameContext): void => {
    context.pendingNarrationSequence = NarrationService.executeNarrationAction(narrationAction, context);
    executePlayerTurnAutomaticallyAndProcessNextEventIfPlayerActionIsNotRequired(context);
  };

  const executePlayerTurnAutomaticallyAndProcessNextEventIfPlayerActionIsNotRequired = (context: GameContext): void => {
    const { playerActionRequired: playerActionRequired } = executePlayerTurnAutomatically(context);
    if (!playerActionRequired) {
      processNextEvent(context);
    }
  };

  const executePlayerTurnAutomatically = (context: GameContext): { playerActionRequired: boolean } => {
    if (context.pendingNarrationSequence) {
      const { pendingStage, scene, narrationSequence, narrationStages } = context.pendingNarrationSequence;
      if (pendingStage) {
        context.pendingNarrationSequence = NarrationService.executeNarrationSequenceStage(
          narrationSequence,
          pendingStage,
          narrationStages,
          context
        );
        if (context.pendingNarrationSequence?.pendingStage) {
          return { playerActionRequired: false };
        } else {
          return executePlayerTurnAutomatically(context);
        }
      } else {
        context.narration = NarrationService.convertSceneToNarration(scene, narrationSequence, narrationStages);
        return { playerActionRequired: true };
      }
    }
    if (context.player.pendingAction) {
      return { playerActionRequired: false };
    }
    context.narration = NarrationService.getNarrationForSelectedField(context.gameState);
    return { playerActionRequired: true };
  };
}
