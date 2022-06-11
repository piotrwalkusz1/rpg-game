import { ActionService } from 'engine/core/action';
import { AttackAction } from 'engine/modules/attack';
import { BattleActivity } from 'engine/modules/battle';
import type { ActivityParticipant } from '../activity';
import { CommandUtils } from '../command';
import type { GameEngine } from '../game';
import type { AI } from './ai';

export namespace AIService {
  export const executeTurn = (ai: AI, engine: GameEngine): void => {
    if (CommandUtils.isCommandPending(ai.character)) {
      return;
    }
    if (ai.character.pendingAction) {
      return;
    }

    const battle: BattleActivity | undefined = ai.character.talker.activityParticipant.getActivity(BattleActivity);
    if (battle) {
      const enemy: ActivityParticipant | undefined = battle.participants
        .getArray()
        .filter((participant) => participant !== ai.character.talker.activityParticipant)[0];
      if (enemy) {
        const action = new AttackAction({ target: enemy.requireEntity() });
        ActionService.scheduleAction(action, ai.character.actionExecutor, engine);
      } else {
        ai.character.talker.activityParticipant.activities.remove(battle);
      }
    }
  };
}
