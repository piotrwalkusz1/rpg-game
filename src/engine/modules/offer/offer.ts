import { ManyToManyCollection } from 'utils';
import { OfferDecision, OfferDecisionValue } from './offer-decision';
import type { OfferParty } from './offer-party';

class OfferPartiesCollection extends ManyToManyCollection<OfferParty, Offer> {
  override getCollection = (party: OfferParty) => party.offers;
}

export type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export abstract class Offer {
  status: OfferStatus = 'PENDING';
  readonly parties: OfferPartiesCollection = new OfferPartiesCollection(this);
  readonly decisions: OfferDecision[];

  constructor({ submitter, otherParties }: { submitter: OfferParty; otherParties: OfferParty[] }) {
    if (otherParties.length === 0) {
      console.error('"otherParties" was expected to have at least one element');
    }
    this.parties.addAll([submitter, ...otherParties]);
    this.decisions = [
      new OfferDecision({ value: 'ACCEPTED', party: submitter }),
      ...otherParties.map((party) => new OfferDecision({ party }))
    ];
  }

  makeDecision(party: OfferParty, decisionValue: OfferDecisionValue): void {
    const decision = this.decisions.find((decision) => decision.party === party);
    if (!decision) {
      console.warn('Decision of this party is not needed');
      return;
    }
    decision.value = decisionValue;
  }

  isAccepted(): boolean {
    return this.decisions.every((decision) => decision.value === 'ACCEPTED');
  }

  isRejected(): boolean {
    return this.decisions.some((decision) => decision.value === 'REJECTED');
  }
}
