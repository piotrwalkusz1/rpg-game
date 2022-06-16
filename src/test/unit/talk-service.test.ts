import { rootField, subFieldAt } from 'engine/core/field';
import type { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import type { OfferService } from 'engine/modules/offer';
import { TalkOffer } from 'engine/modules/talk/talk-offer';
import { TalkService } from 'engine/modules/talk/talk-service';
import { GameBuilder } from 'game';
import { IMock, It, Mock, Times } from 'typemoq';

describe('TalkService', () => {
  let offerServiceMock: IMock<OfferService>;
  let talkService: TalkService;
  let engine: GameEngine;

  beforeEach(() => {
    offerServiceMock = Mock.ofType<OfferService>();
    talkService = new TalkService(offerServiceMock.object);
    engine = new GameBuilder([]).build();
  });

  describe('offerTalk', () => {
    it('should make offer', () => {
      const talkInitiator = Character.create(engine, { field: subFieldAt(rootField(engine), [0, 0]) });
      const invitedTalker = Character.create(engine, { field: subFieldAt(rootField(engine), [0, 0]) });
      offerServiceMock
        .setup((instance) => instance.makeOffer(new TalkOffer(talkInitiator.talker, invitedTalker.talker), engine))
        .verifiable(Times.once());

      const result = talkService.offerTalk(talkInitiator.talker, invitedTalker.talker, engine);

      expect(result).toBe(true);
      offerServiceMock.verifyAll();
    });

    it('should not make offer if talkers are on other fields', () => {
      const talkInitiator = Character.create(engine, { field: subFieldAt(rootField(engine), [0, 0]) });
      const invitedTalker = Character.create(engine, { field: subFieldAt(rootField(engine), [0, 1]) });

      const result = talkService.offerTalk(talkInitiator.talker, invitedTalker.talker, engine);

      expect(result).toBe(false);
      offerServiceMock.verify((instance) => instance.makeOffer(It.isAny(), It.isAny()), Times.never());
    });

    it('should not make offer if talkers are not on any fields', () => {
      const talkInitiator = Character.create(engine);
      const invitedTalker = Character.create(engine);

      const result = talkService.offerTalk(talkInitiator.talker, invitedTalker.talker, engine);

      expect(result).toBe(false);
      offerServiceMock.verify((instance) => instance.makeOffer(It.isAny(), It.isAny()), Times.never());
    });
  });
});
