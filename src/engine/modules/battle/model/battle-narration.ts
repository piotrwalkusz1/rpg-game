import type { Character } from '../../../core/character/model/character';
import type { BattleActivity } from './battle-activity';

export class BattleNarration {
  readonly battleActivity: BattleActivity;
  currentParticipant?: Character;

  constructor({ battleActivity, currentParticipant }: { battleActivity: BattleActivity; currentParticipant?: Character }) {
    this.battleActivity = battleActivity;
    this.currentParticipant = currentParticipant;
  }
}
