import { AttackAction } from '../../action/model/actions/attack-action';
import { ActionService } from '../../action/service/action-service';
import { BattleActivity } from '../../activity/model/activities/battle-activity';
import type { Character } from '../../character/model/character';
import { ArrayUtils } from '../../common/array-utils';
import type { GameContext } from '../../game/model/game-context';

export namespace AIService {
  export const executeTurn = (character: Character, context: GameContext): void => {
    const battle: BattleActivity | undefined = ArrayUtils.filterInstanceOf(character.activities.getArray(), BattleActivity)[0];
    if (battle) {
      const enemy: Character | undefined = battle.participants.getArray().filter((participant) => participant !== character)[0];
      if (enemy) {
        const action = new AttackAction({ character, target: enemy });
        ActionService.scheduleAction(action, context);
      }
    }
  };
}
