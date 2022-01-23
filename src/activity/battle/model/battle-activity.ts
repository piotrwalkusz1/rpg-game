import type { Character } from '../../../character/model/character';
import { Activity } from '../../model/activity';

export class BattleActivity extends Activity {
  isEnded(character: Character): boolean {
    return this.getEnemiesThatCanStillFight(character).length === 0;
  }

  getEnemiesThatCanStillFight(character: Character): Character[] {
    return this.getParticipantsThatCanStillFight().filter((participant) => this.areEnemies(character, participant));
  }

  getEnemies(character: Character): Character[] {
    return this.participants.getArray().filter((participant) => this.areEnemies(character, participant));
  }

  getAllies(character: Character): Character[] {
    return this.participants.getArray().filter((participant) => !this.areEnemies(character, participant));
  }

  areEnemies(firstParticipant: Character, secondParticipant: Character): boolean {
    return firstParticipant !== secondParticipant;
  }

  private getParticipantsThatCanStillFight(): Character[] {
    return this.participants.getArray().filter((participant) => participant.healthPoints > 0);
  }

  canStillFight(participant: Character): boolean {
    return participant.healthPoints > 0;
  }
}
