import { GameEvent } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import type { Offer } from './offer';

export class OfferEvent extends GameEvent {
  readonly offer: Offer;

  constructor({ time, offer }: { time: Time; offer: Offer }) {
    super({ time });
    this.offer = offer;
  }
}

export class NewOffer extends OfferEvent {}

export class OfferAcceptedEvent extends OfferEvent {}

export class OfferRejectedEvent extends OfferEvent {}
