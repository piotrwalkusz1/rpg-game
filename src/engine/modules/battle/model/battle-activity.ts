import { Activity } from '../../../core/activity/model/activity';
import type { Actor } from '../../../core/actor/model/actor';

export class BattleActivity extends Activity {
  isEnded(character: Actor): boolean {
    return this.getEnemiesThatCanStillFight(character).length === 0;
  }

  getEnemiesThatCanStillFight(character: Actor): Actor[] {
    return this.getParticipantsThatCanStillFight().filter((participant) => this.areEnemies(character, participant));
  }

  getEnemies(character: Actor): Actor[] {
    return this.participants.getArray().filter((participant) => this.areEnemies(character, participant));
  }

  getAllies(character: Actor): Actor[] {
    return this.participants.getArray().filter((participant) => !this.areEnemies(character, participant));
  }

  areEnemies(firstParticipant: Actor, secondParticipant: Actor): boolean {
    return firstParticipant !== secondParticipant;
  }

  private getParticipantsThatCanStillFight(): Actor[] {
    return this.participants.getArray().filter((participant) => participant.healthPoints > 0);
  }

  canStillFight(participant: Actor): boolean {
    return participant.healthPoints > 0;
  }
}
