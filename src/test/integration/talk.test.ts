import { CDIContainer } from 'cdi-container';
import type { GameEngine } from 'engine/core/game';
import { OfferService } from 'engine/modules/offer';
import { TalkActivity } from 'engine/modules/talk';
import { TalkService } from 'engine/modules/talk/talk-service';
import { Talker } from 'engine/modules/talk/talker';
import { GameService } from 'frontend/game';
import { GameBuilder } from 'game';

describe('Talk', () => {
  let engine: GameEngine;
  let talker: Talker;
  let talker2: Talker;

  beforeEach(() => {
    engine = CDIContainer.create().get(GameBuilder).build();
    talker = Talker.create(engine);
    talker2 = Talker.create(engine);
  });

  test('Create talk activity after ', async () => {
    TalkService.offerTalk(talker, talker2, engine);
    await GameService.processEvents(engine, () => {});
    const offers = talker2.offerParty.offers;
    OfferService.makeDecision(offers[0], talker2, 'ACCEPTED', engine);
    await GameService.processEvents(engine, () => {});

    expect(talker.activityParticipant.activities.getArray()[0]).toBeInstanceOf(TalkActivity);
    expect(talker.activityParticipant.activities.getArray()[0].participants.getArray()).toEqual([
      talker.activityParticipant,
      talker2.activityParticipant
    ]);
  });
});
