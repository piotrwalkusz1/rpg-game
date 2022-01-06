import type { Character } from '../../character/model/character';
import type { BattleParticipant } from './battle-participant';
import { BattleQueue } from './battle-queue';
import type { BattleTeam } from './battle-team';

export class Battle {
  readonly firstTeam: BattleTeam;
  readonly secondTeam: BattleTeam;
  readonly queue: BattleQueue;

  constructor({ firstTeam, secondTeam }: { firstTeam: BattleTeam; secondTeam: BattleTeam }) {
    this.firstTeam = firstTeam;
    this.secondTeam = secondTeam;
    this.queue = new BattleQueue([...firstTeam.participants, ...secondTeam.participants]);
  }

  areEnemies(firstCharacter: Character, secondCharacter: Character): boolean {
    return !this.areAllies(firstCharacter, secondCharacter);
  }

  areAllies(firstCharacter: Character, secondCharacter: Character): boolean {
    return this.getTeamOfCharacter(firstCharacter) === this.getTeamOfCharacter(secondCharacter);
  }

  getTeamOfCharacter(character: Character): BattleTeam | undefined {
    return this.getTeams().find((team) => team.containsCharacter(character));
  }

  getEnemiesOfCharacterThanStillCanFight(character: Character): BattleParticipant[] {
    return this.getEnemiesOfCharacter(character).filter((character) => character.canStillFight());
  }

  getEnemiesOfCharacter(character: Character): BattleParticipant[] {
    const allyTeam = this.getTeamOfCharacter(character);
    return this.getTeams()
      .filter((team) => team !== allyTeam)
      .flatMap((team) => team.participants);
  }

  isBattleEnded(): boolean {
    return this.getTeams().filter((team) => team.canStillFight()).length < 2;
  }

  private getTeams(): BattleTeam[] {
    return [this.firstTeam, this.secondTeam];
  }
}
