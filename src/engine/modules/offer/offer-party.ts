import { Component, Engine, Entity } from 'engine/core/ecs';
import type { Offer } from './offer';

export class OfferParty extends Component {
  private readonly _offers: Offer[] = [];

  static create(engine: Engine): OfferParty {
    const offerParty: OfferParty = new OfferParty();
    const entity: Entity = new Entity();
    entity.addComponent(offerParty);
    engine.addEntity(entity);
    return offerParty;
  }

  get offers(): readonly Offer[] {
    return this._offers;
  }

  addOffer(offer: Offer): void {
    this._offers.push(offer);
  }
}
