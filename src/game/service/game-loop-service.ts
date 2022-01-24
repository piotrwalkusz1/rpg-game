import { differenceInMilliseconds } from 'date-fns';
import { tr } from 'date-fns/locale';
import { BattleActivity } from '../../activity/battle/model/battle-activity';
import { BattleNarration } from '../../activity/battle/model/battle-narration';
import { ActivityService } from '../../activity/service/activity-service';
import type { Narration } from '../../narration/model/narration';
import type { NarrationAction } from '../../narration/model/narration-actions/narration-action';
import type { NarrationSequence } from '../../narration/model/narration-sequence/narration-sequence';
import type { NarrationSequenceStage } from '../../narration/model/narration-sequence/narration-sequence-stage';
import { NarrationService } from '../../narration/service/narration-service';
import type { GameContext } from '../model/game-context';

export namespace GameLoopService {
  export const processNextEvent = async (context: GameContext): Promise<void> => {
    const event = context.popNextGameEvent();
    if (!event) {
      return;
    }
    await animateFlowOfTime(event.time, context);
    await event.process(context);
    await executePlayerTurnAutomaticallyAndProcessNextEventIfPlayerActionIsNotRequired(context);
  };

  export const executeNarrationAction = async (narrationAction: NarrationAction, context: GameContext): Promise<void> => {
    await executeNarrationSequenceStages(narrationAction.narrationSequence, narrationAction.narrationStages, context);
  };

  export const executeNarrationSequenceStages = async (
    narrationSequence: NarrationSequence,
    narrationStages: NarrationSequenceStage[],
    context: GameContext
  ): Promise<void> => {
    context.pendingNarrationSequence = NarrationService.executeNarrationSequenceStages(narrationSequence, narrationStages, context);
    await executePlayerTurnAutomaticallyAndProcessNextEventIfPlayerActionIsNotRequired(context);
  };

  const executePlayerTurnAutomaticallyAndProcessNextEventIfPlayerActionIsNotRequired = async (context: GameContext): Promise<void> => {
    const result = executePlayerTurnAutomatically(context);
    if (result.playerActionRequired) {
      context.narration = result.narration;
      context.battle = result.battle;
    } else {
      await processNextEvent(context);
    }
  };

  const executePlayerTurnAutomatically = (
    context: GameContext
  ): { playerActionRequired: true; narration?: Narration; battle?: BattleNarration } | { playerActionRequired: false } => {
    const scheduledNarrationSequence = context.gameState.scheduledNarrationSequences.shift();
    if (scheduledNarrationSequence) {
      context.pendingNarrationSequence = NarrationService.executeNarrationSequenceStages(
        scheduledNarrationSequence,
        scheduledNarrationSequence.checkpointStages,
        context
      );
      return executePlayerTurnAutomatically(context);
    }
    if (context.pendingNarrationSequence) {
      const { pendingStage, scene, narrationSequence, narrationStages } = context.pendingNarrationSequence;
      if (pendingStage) {
        context.pendingNarrationSequence = NarrationService.executeNarrationSequenceStage(
          narrationSequence,
          pendingStage,
          narrationStages,
          context
        );
        if (!context.pendingNarrationSequence?.pendingStage) {
          return executePlayerTurnAutomatically(context);
        }
      } else {
        return {
          playerActionRequired: true,
          narration: NarrationService.convertSceneToNarration(scene, narrationSequence, narrationStages)
        };
      }
    }
    if (context.player.pendingAction) {
      return { playerActionRequired: false };
    }
    const battle = ActivityService.getActivityByType(context.player, BattleActivity);
    if (battle) {
      if (battle.isEnded(context.player)) {
        context.removeActivity(context.player, battle);
        return executePlayerTurnAutomatically(context);
      }
      return { playerActionRequired: true, battle: new BattleNarration({ battleActivity: battle }) };
    }
    if (context.pendingNarrationSequence) {
      return { playerActionRequired: false };
    }
    return { playerActionRequired: true, narration: NarrationService.getNarrationForSelectedField(context.gameState) };
  };

  const animateFlowOfTime = async (newTime: Date, context: GameContext): Promise<void> => {
    const durationInGame = differenceInMilliseconds(newTime, context.currentTime);
    const duration = ActivityService.getActivityByType(context.player, BattleActivity) ? durationInGame : 0;
    await context.changeTime(newTime, duration);
  };
}
