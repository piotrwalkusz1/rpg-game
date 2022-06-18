import { GameEngine } from 'engine/core/game';
import { OfferAcceptedEvent } from 'engine/modules/offer';
import { TalkSystem } from 'engine/modules/talk';
import { TalkOffer } from 'engine/modules/talk/talk-offer';
import type { TalkService } from 'engine/modules/talk/talk-service';
import { Talker } from 'engine/modules/talk/talker';
import { IMock, Mock, Times } from 'typemoq';

describe('Talk system', () => {
  let talkServiceMock: IMock<TalkService>;
  let talkSystem: TalkSystem;
  let engine: GameEngine;
  let talker: Talker;
  let talker2: Talker;

  beforeEach(() => {
    talkServiceMock = Mock.ofType<TalkService>();
    talkSystem = new TalkSystem(talkServiceMock.object);
    engine = new GameEngine();
    talker = Talker.create(engine);
    talker2 = Talker.create(engine);
  });

  describe('processEvent', () => {
    it('should start talk', async () => {
      const offer = new TalkOffer(talker, talker2);
      offer.makeDecision(talker2.offerParty, 'ACCEPTED');

      await talkSystem.processEvent(new OfferAcceptedEvent({ time: engine.time, offer }), engine);

      talkServiceMock.verify((instance) => instance.startTalk([talker, talker2], engine), Times.once());
    });
  });
});
