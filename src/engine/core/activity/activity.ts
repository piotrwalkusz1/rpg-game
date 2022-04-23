import type { ActivityParticipant } from 'engine/core/activity/activity-participant';
import { ManyToManyCollection } from '../../../utils/cache-relationship-utils';

class ParticipantsCollection extends ManyToManyCollection<ActivityParticipant, Activity> {
  override getCollection = (participant: ActivityParticipant) => participant.activities;
}

export abstract class Activity {
  readonly participants: ParticipantsCollection = new ParticipantsCollection(this);

  constructor({ participants }: { participants: ActivityParticipant[] }) {
    participants.forEach((participant) => this.participants.add(participant));
  }

  addParticipant(particiapant: ActivityParticipant): void {
    this.participants.add(particiapant);
  }

  removeParticipant(participant: ActivityParticipant): void {
    this.participants.remove(participant);
  }
}
