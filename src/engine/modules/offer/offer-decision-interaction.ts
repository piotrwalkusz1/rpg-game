import { Interaction } from '../interaction';
import type { Offer } from './offer';
import type { OfferDecisionValue } from './offer-decision';

export class OfferDecisionInteraction extends Interaction {
  readonly offer: Offer;
  readonly decision: OfferDecisionValue;

  constructor({ offer, decision }: { offer: Offer; decision: OfferDecisionValue }) {
    super();
    this.offer = offer;
    this.decision = decision;
  }
}
