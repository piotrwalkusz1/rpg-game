import type { OfferParty } from './offer-party';

export type OfferDecisionValue = 'ACCEPTED' | 'REJECTED';

export class OfferDecision {
  readonly value: OfferDecisionValue | undefined;
  readonly party: OfferParty;

  constructor({ value, party }: { value?: OfferDecisionValue; party: OfferParty }) {
    this.value = value;
    this.party = party;
  }
}
