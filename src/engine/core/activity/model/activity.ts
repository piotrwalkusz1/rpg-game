import { ManyToManyCollection } from '../../../../utils/cache-relationship-utils';
import type { Character } from '../../character/model/character';

class ParticipantsCollection extends ManyToManyCollection<Character, Activity> {
  override getCollection = (participant: Character) => participant.activities;
}

export abstract class Activity {
  readonly participants: ParticipantsCollection = new ParticipantsCollection(this);

  constructor({ participants }: { participants: Character[] }) {
    participants.forEach((participant) => this.participants.add(participant));
  }

  addParticipant(particiapant: Character): void {
    this.participants.add(particiapant);
  }

  removeParticipant(participant: Character): void {
    this.participants.remove(participant);
  }
}
