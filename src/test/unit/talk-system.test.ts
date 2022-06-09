import { addMinutes } from 'date-fns';
import { ActivityParticipant } from 'engine/core/activity';
import { EndActivityEvent } from 'engine/core/activity/activity-event';
import type { Time } from 'engine/core/time';
import { Character } from 'engine/modules/character';
import { OfferAcceptedEvent, OfferParty } from 'engine/modules/offer';
import { TalkActivity, TalkSystem } from 'engine/modules/talk';
import { TalkService } from 'engine/modules/talk/talk-service';
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
      const firstParty = engine.addCharacter().requireComponent(OfferParty);
      const secondParty = engine.addCharacter().requireComponent(OfferParty);
      const offer = TalkService.offerTalk(firstParty.requireComponent(Character), secondParty.requireComponent(Character));
      offer.pendingDecisions.forEach((pendingDecision) => (pendingDecision.value = 'ACCEPTED'));

      await talkSystem.processEvent(new OfferAcceptedEvent({ time, offer }), engine);

      expect(firstParty.requireComponent(ActivityParticipant).activities.length).toEqual(1);
      const activity = firstParty.requireComponent(ActivityParticipant).activities.get(0);
      expect(secondParty.requireComponent(ActivityParticipant).activities.getArray()).toEqual([activity]);
      expect(activity.participants.getArray()).toEqual([
        firstParty.requireComponent(ActivityParticipant),
        secondParty.requireComponent(ActivityParticipant)
      ]);
      expect(activity).toBeInstanceOf(TalkActivity);
    });

    it('should scheduled EndActivityEvent', async () => {
      const firstParty = engine.addCharacter().requireComponent(OfferParty);
      const secondParty = engine.addCharacter().requireComponent(OfferParty);
      const offer = TalkService.offerTalk(firstParty.requireComponent(Character), secondParty.requireComponent(Character));
      offer.pendingDecisions.forEach((pendingDecision) => (pendingDecision.value = 'ACCEPTED'));

      await talkSystem.processEvent(new OfferAcceptedEvent({ time, offer }), engine);

      const activity = firstParty.requireComponent(ActivityParticipant).activities.get(0);
      expect(engine.events).toEqual([new EndActivityEvent({ time: addMinutes(time, 1), activity })]);
    });
  });
});
