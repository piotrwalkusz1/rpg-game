import type { Character } from '../../character/model/character';
import { ManyToManyCollection } from '../../common/cache-relationship-utils';

class ParticipantsCollection extends ManyToManyCollection<Character, Activity> {
  override getCollection = (participant: Character) => participant.activities;
}

export abstract class Activity {
  readonly participants: ParticipantsCollection = new ParticipantsCollection(this);

  addParticipant(particiapant: Character): void {
    this.participants.add(particiapant);
  }

  removeParticipant(participant: Character): void {
    this.participants.remove(participant);
  }
}
