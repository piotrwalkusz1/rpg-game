import { Component } from 'engine/core/ecs';
import type { Offer } from './offer';

export class OfferParty extends Component {
  private readonly _offers: Offer[] = [];

  get offers(): readonly Offer[] {
    return this._offers;
  }

  addOffer(offer: Offer): void {
    this._offers.push(offer);
  }
}
