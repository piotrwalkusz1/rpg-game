import type { Character } from '../../character/model/character';
import type { BattleParticipant } from './battle-participant';

export class BattleTeam {
  readonly participants: BattleParticipant[];

  constructor({ participants }: { participants: BattleParticipant[] }) {
    this.participants = participants;
  }

  containsCharacter(character: Character): boolean {
    return this.participants.find((participant) => participant.character === character) !== undefined;
  }

  canStillFight(): boolean {
    return this.participants.some((participant) => participant.canStillFight());
  }
}
