import { addMinutes } from 'date-fns';
import { EndActivityEvent } from 'engine/core/activity/activity-event';
import type { Time } from 'engine/core/time';
import { OfferAcceptedEvent } from 'engine/modules/offer';
import { TalkActivity, TalkSystem } from 'engine/modules/talk';
import { TalkOffer } from 'engine/modules/talk/talk-offer';
import { getTalkerBundle } from 'engine/modules/talk/talker-bundle';
import { MockEngine } from 'test/mock/mock-engine';

describe('Talk system', () => {
  let talkSystem: TalkSystem;
  let engine: MockEngine;
  let time: Time;

  beforeEach(() => {
    talkSystem = new TalkSystem();
    engine = new MockEngine();
    time = engine.time;
  });

  describe('OfferAcceptedEvent', () => {
    it('should create talk activity', async () => {
      const talker = getTalkerBundle(engine.addCharacter());
      const talker2 = getTalkerBundle(engine.addCharacter());
      const offer = new TalkOffer(talker, talker2);
      offer.makeDecision(talker2.offerParty, 'ACCEPTED');

      await talkSystem.processEvent(new OfferAcceptedEvent({ time, offer }), engine);

      expect(talker.activityParticipant.activities.length).toEqual(1);
      const activity = talker.activityParticipant.activities.get(0);
      expect(talker2.activityParticipant.activities.getArray()).toEqual([activity]);
      expect(activity.participants.getArray()).toEqual([talker.activityParticipant, talker2.activityParticipant]);
      expect(activity).toBeInstanceOf(TalkActivity);
    });

    it('should scheduled EndActivityEvent', async () => {
      const talker = getTalkerBundle(engine.addCharacter());
      const talker2 = getTalkerBundle(engine.addCharacter());
      const offer = new TalkOffer(talker, talker2);
      offer.makeDecision(talker2.offerParty, 'ACCEPTED');

      await talkSystem.processEvent(new OfferAcceptedEvent({ time, offer }), engine);

      const activity = talker.activityParticipant.activities.get(0);
      expect(engine.events).toEqual([new EndActivityEvent({ time: addMinutes(time, 1), activity })]);
    });
  });
});
