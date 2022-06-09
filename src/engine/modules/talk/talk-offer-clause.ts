import type { ActivityParticipant } from 'engine/core/activity';
import { OfferClause } from '../offer';

export class TalkOfferClause extends OfferClause {
  readonly interlocutors: readonly ActivityParticipant[];

  constructor({ interlocutors }: { interlocutors: ActivityParticipant[] }) {
    super();
    this.interlocutors = interlocutors;
  }
}
