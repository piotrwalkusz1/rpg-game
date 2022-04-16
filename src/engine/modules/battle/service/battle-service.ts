import { ArrayUtils } from '../../../../utils/array-utils';
import type { Character } from '../../../core/character/model/character';
import { BattleActivity } from '../model/battle-activity';

export namespace BattleService {
  export const setCommonBattleActivity = (characters: Character[]): BattleActivity => {
    const battles = characters.flatMap((character) => ArrayUtils.filterInstanceOf(character.activities.getArray(), BattleActivity));
    const currentBattlesParticipants = battles.flatMap((battle) => battle.participants.getArray());
    battles.forEach((battle) => battle.participants.removeAll());
    return new BattleActivity({ participants: ArrayUtils.distinct([...currentBattlesParticipants, ...characters]) });
  };
}
