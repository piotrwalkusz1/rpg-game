import { differenceInMilliseconds } from 'date-fns';
import { BattleActivity } from '../../activity/battle/model/battle-activity';
import { BattleNarration } from '../../activity/battle/model/battle-narration';
import { ActivityService } from '../../activity/service/activity-service';
import type { Narration } from '../../narration/model/narration';
import type { NarrationAction } from '../../narration/model/narration-actions/narration-action';
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

  export const executePlayerTurn = async (narrationAction: NarrationAction, context: GameContext): Promise<void> => {
    context.pendingNarrationSequence = NarrationService.executeNarrationAction(narrationAction, context);
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
    return { playerActionRequired: true, narration: NarrationService.getNarrationForSelectedField(context.gameState) };
  };

  const animateFlowOfTime = async (newTime: Date, context: GameContext): Promise<void> => {
    const durationInGame = differenceInMilliseconds(newTime, context.currentTime);
    const duration = ActivityService.getActivityByType(context.player, BattleActivity) ? durationInGame : 0;
    await context.changeTime(newTime, duration);
  };
}