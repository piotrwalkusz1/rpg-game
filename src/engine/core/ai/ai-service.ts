import { ActionService } from 'engine/core/action';
import { AttackAction } from 'engine/modules/attack';
import { BattleActivity } from 'engine/modules/battle';
import type { ActivityParticipant } from '../activity';
import type { GameEngine } from '../game';
import type { AI } from './ai';

export namespace AIService {
  export const executeTurn = (ai: AI, engine: GameEngine): void => {
    if (ai.character.pendingAction || ai.character.pendingCommand) {
      return;
    }

    const battle: BattleActivity | undefined = ai.activityParticipant.getActivity(BattleActivity);
    if (!battle) {
      return;
    }

    const enemy: ActivityParticipant | undefined = battle.getParticipantsOtherThan(ai.activityParticipant)[0];
    if (enemy) {
      const action = new AttackAction({ target: enemy.requireEntity() });
      ActionService.scheduleAction(action, ai.character.actionExecutor, engine);
    } else {
      ai.activityParticipant.removeActivity(battle);
    }
  };
}
