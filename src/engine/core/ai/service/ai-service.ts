import { ArrayUtils } from '../../../../utils/array-utils';
import { AttackAction } from '../../../modules/battle/model/actions/attack-action';
import { BattleActivity } from '../../../modules/battle/model/battle-activity';
import { ActionService } from '../../action/service/action-service';
import type { Actor } from '../../actor/model/actor';
import type { GameContext } from '../../game/model/game-context';

export namespace AIService {
  export const executeTurn = (character: Actor, context: GameContext): void => {
    if (character.pendingAction) {
      return;
    }
    const battle: BattleActivity | undefined = ArrayUtils.filterInstanceOf(character.activities.getArray(), BattleActivity)[0];
    if (battle) {
      const enemy: Actor | undefined = battle.participants.getArray().filter((participant) => participant !== character)[0];
      if (enemy) {
        const action = new AttackAction({ character, target: enemy });
        const scheduleActionResult = ActionService.scheduleAction(action, context);
        switch (scheduleActionResult.type) {
          case 'SUCCESS':
          case 'PREVENTION':
          case 'CANNOT_EXECUTE':
            break;
        }
      } else {
        character.activities.remove(battle);
      }
    }
  };
}
