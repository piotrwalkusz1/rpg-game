import { Component } from 'engine/core/ecs';
import { ManyToManyCollection } from 'utils';
import type { Offer } from './offer';

class OffersCollection extends ManyToManyCollection<Offer, OfferParty> {
  override getCollection = (offer: Offer) => offer.parties;
}

export class OfferParty extends Component {
  readonly offers: OffersCollection = new OffersCollection(this);
}
