import { OfferClause } from '../offer';
import type { Talker } from './talker';

export class TalkOfferClause extends OfferClause {
  readonly talkers: readonly Talker[];

  constructor({ talkers }: { talkers: Talker[] }) {
    super();
    this.talkers = talkers;
  }
}
