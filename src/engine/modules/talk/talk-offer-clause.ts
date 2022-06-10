import { OfferClause } from '../offer';
import type { TalkerBundle } from './talker-bundle';

export class TalkOfferClause extends OfferClause {
  readonly talkers: readonly TalkerBundle[];

  constructor({ talkers }: { talkers: TalkerBundle[] }) {
    super();
    this.talkers = talkers;
  }
}
