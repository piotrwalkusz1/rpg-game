import { Interaction } from '../interaction';
import type { Offer } from './offer';

export class OfferInteraction extends Interaction {
  readonly offer: Offer;

  constructor(offer: Offer) {
    super();
    this.offer = offer;
  }
}
