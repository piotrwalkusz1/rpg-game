import type { ActivityParticipant } from '.';

export abstract class Activity {
  private readonly _participants: readonly ActivityParticipant[];

  constructor({ participants }: { participants: readonly ActivityParticipant[] }) {
    this._participants = [...participants];
  }

  get participants(): readonly ActivityParticipant[] {
    return this._participants;
  }

  getParticipantsOtherThan(excludedParticipant: ActivityParticipant): ActivityParticipant[] {
    return this._participants.filter((participant) => participant !== excludedParticipant);
  }
}
