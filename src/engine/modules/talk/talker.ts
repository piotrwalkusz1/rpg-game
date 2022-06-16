import { ActivityParticipant } from 'engine/core/activity';
import { Component, Engine, Entity } from 'engine/core/ecs';
import { FieldObject } from 'engine/core/field';
import { OfferParty } from '../offer';

export class Talker extends Component {
  readonly offerParty: OfferParty;
  readonly activityParticipant: ActivityParticipant;
  readonly fieldObject: FieldObject;

  constructor({
    offerParty,
    activityParticipant,
    fieldObject
  }: {
    offerParty: OfferParty;
    activityParticipant: ActivityParticipant;
    fieldObject: FieldObject;
  }) {
    super();
    this.offerParty = offerParty;
    this.activityParticipant = activityParticipant;
    this.fieldObject = fieldObject;
  }

  static create(engine: Engine): Talker {
    const offerParty = new OfferParty();
    const activityParticipant = new ActivityParticipant();
    const fieldObject = new FieldObject();
    const talker = new Talker({ offerParty, activityParticipant, fieldObject });
    engine.addEntity(new Entity().addComponents([offerParty, activityParticipant, talker]));
    return talker;
  }
}
