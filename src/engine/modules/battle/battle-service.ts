import type { ActivityParticipant } from 'engine/core/activity';
import { ArrayUtils } from '../../../utils/array-utils';
import { BattleActivity } from './battle-activity';

export namespace BattleService {
  export const setCommonBattleActivity = (characters: ActivityParticipant[]): BattleActivity => {
    const battles = characters.flatMap((character) => ArrayUtils.filterInstanceOf(character.activities.getArray(), BattleActivity));
    const currentBattlesParticipants = battles.flatMap((battle) => battle.participants.getArray());
    battles.forEach((battle) => battle.participants.removeAll());
    return new BattleActivity({ participants: ArrayUtils.distinct([...currentBattlesParticipants, ...characters]) });
  };
}
