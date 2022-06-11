import { ActivityParticipant } from 'engine/core/activity';
import { Component, Engine, Entity } from 'engine/core/ecs';
import { OfferParty } from '../offer';

export class Talker extends Component {
  readonly offerParty: OfferParty;
  readonly activityParticipant: ActivityParticipant;

  constructor({ offerParty, activityParticipant }: { offerParty: OfferParty; activityParticipant: ActivityParticipant }) {
    super();
    this.offerParty = offerParty;
    this.activityParticipant = activityParticipant;
  }

  static create(engine: Engine): Talker {
    const offerParty = new OfferParty();
    const activityParticipant = new ActivityParticipant();
    const talker = new Talker({ offerParty, activityParticipant });
    engine.addEntity(new Entity().addComponents([offerParty, activityParticipant, talker]));
    return talker;
  }
}
