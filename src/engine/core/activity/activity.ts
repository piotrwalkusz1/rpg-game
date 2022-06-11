import { ManyToManyCollection } from 'utils';
import type { ActivityParticipant } from '.';

class ParticipantsCollection extends ManyToManyCollection<ActivityParticipant, Activity> {
  override getCollection = (participant: ActivityParticipant) => participant.activities;
}

export abstract class Activity {
  readonly participants: ParticipantsCollection = new ParticipantsCollection(this);

  constructor({ participants }: { participants: readonly ActivityParticipant[] }) {
    participants.forEach((participant) => this.participants.add(participant));
  }

  getParticipantsOtherThan(activityParticipant: ActivityParticipant): ActivityParticipant[] {
    return this.participants.getArray().filter((participant) => participant !== activityParticipant);
  }

  removeAllParticipants(): void {
    // Participants must be copied to new array to prevent iterating and modifying the same array
    const participants = [...this.participants.getArray()];
    participants.forEach((participant) => this.removeParticipant(participant));
  }

  removeParticipant(participant: ActivityParticipant): void {
    this.participants.remove(participant);
  }
}
