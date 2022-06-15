import { addMinutes } from 'date-fns';
import { EndActivityEvent } from 'engine/core/activity/activity-event';
import { GameEngine } from 'engine/core/game';
import { OfferAcceptedEvent } from 'engine/modules/offer';
import { TalkActivity, TalkSystem } from 'engine/modules/talk';
import { TalkOffer } from 'engine/modules/talk/talk-offer';
import { Talker } from 'engine/modules/talk/talker';

describe('Talk system', () => {
  let talkSystem: TalkSystem;
  let engine: GameEngine;
  let talker: Talker;
  let talker2: Talker;

  beforeEach(() => {
    talkSystem = new TalkSystem();
    engine = new GameEngine();
    talker = Talker.create(engine);
    talker2 = Talker.create(engine);
  });

  describe('OfferAcceptedEvent', () => {
    it('should create talk activity', async () => {
      const offer = new TalkOffer(talker, talker2);
      offer.makeDecision(talker2.offerParty, 'ACCEPTED');

      await talkSystem.processEvent(new OfferAcceptedEvent({ time: engine.time, offer }), engine);

      expect(talker.activityParticipant.activities.length).toEqual(1);
      const activity = talker.activityParticipant.activities.get(0);
      expect(talker2.activityParticipant.activities.getArray()).toEqual([activity]);
      expect(activity.participants.getArray()).toEqual([talker.activityParticipant, talker2.activityParticipant]);
      expect(activity).toBeInstanceOf(TalkActivity);
    });

    it('should schedule EndActivityEvent', async () => {
      const offer = new TalkOffer(talker, talker2);
      offer.makeDecision(talker2.offerParty, 'ACCEPTED');

      await talkSystem.processEvent(new OfferAcceptedEvent({ time: engine.time, offer }), engine);

      const activity = talker.activityParticipant.activities.get(0);
      expect(engine.events).toEqual([new EndActivityEvent({ time: addMinutes(engine.time, 1), activity })]);
    });
  });
});
