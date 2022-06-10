import type { GameEngine } from 'engine/core/game';
import { getCharacterByName } from 'engine/modules/character';
import { OfferService } from 'engine/modules/offer';
import { TalkActivity } from 'engine/modules/talk';
import { TalkService } from 'engine/modules/talk/talk-service';
import { getTalkerBundle, TalkerBundle } from 'engine/modules/talk/talker-bundle';
import { GameService } from 'frontend/game';
import { GameBuilder } from 'game';

describe('Talk', () => {
  let engine: GameEngine;
  let talker: TalkerBundle;
  let talker2: TalkerBundle;

  beforeEach(() => {
    engine = new GameBuilder().addCharacter({ name: 'CHARACTER_1' }).addCharacter({ name: 'CHARACTER_2' }).build();
    talker = getTalkerBundle(getCharacterByName(engine, 'CHARACTER_1'));
    talker2 = getTalkerBundle(getCharacterByName(engine, 'CHARACTER_2'));
  });

  test('Create talk activity after ', async () => {
    TalkService.offerTalk(talker, talker2, engine);
    await GameService.processEvents(engine, () => {});
    const offers = talker2.offerParty.offers;
    OfferService.makeDecision(offers[0], talker2.character, 'ACCEPTED', engine);
    await GameService.processEvents(engine, () => {});

    expect(talker.activityParticipant.activities.getArray()[0]).toBeInstanceOf(TalkActivity);
    expect(talker.activityParticipant.activities.getArray()[0].participants.getArray()).toEqual([
      talker.activityParticipant,
      talker2.activityParticipant
    ]);
  });
});
