import type { Actor } from '../../../core/actor/model/actor';
import type { BattleActivity } from './battle-activity';

export class BattleNarration {
  readonly battleActivity: BattleActivity;
  currentParticipant?: Actor;

  constructor({ battleActivity, currentParticipant }: { battleActivity: BattleActivity; currentParticipant?: Actor }) {
    this.battleActivity = battleActivity;
    this.currentParticipant = currentParticipant;
  }
}
