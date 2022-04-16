import { ManyToManyCollection } from '../../../../utils/cache-relationship-utils';
import type { Actor } from '../../actor/model/actor';

class ParticipantsCollection extends ManyToManyCollection<Actor, Activity> {
  override getCollection = (participant: Actor) => participant.activities;
}

export abstract class Activity {
  readonly participants: ParticipantsCollection = new ParticipantsCollection(this);

  constructor({ participants }: { participants: Actor[] }) {
    participants.forEach((participant) => this.participants.add(participant));
  }

  addParticipant(particiapant: Actor): void {
    this.participants.add(particiapant);
  }

  removeParticipant(participant: Actor): void {
    this.participants.remove(participant);
  }
}
