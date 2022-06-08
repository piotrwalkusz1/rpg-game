import { Interaction } from '../interaction';
import type { Offer } from './offer';
import type { OfferParty } from './offer-party';

export abstract class OfferInteraction extends Interaction {
  abstract createOffer(submitter: OfferParty): Offer;
}
