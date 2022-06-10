import { ActivityParticipant } from 'engine/core/activity';
import type { GameEngine } from 'engine/core/game';
import { Character, getCharacterByName } from 'engine/modules/character';
import { OfferParty, OfferService } from 'engine/modules/offer';
import { TalkActivity } from 'engine/modules/talk';
import { TalkService } from 'engine/modules/talk/talk-service';
import { GameService } from 'frontend/game';
import { GameBuilder } from 'game';

describe('Talk', () => {
  let engine: GameEngine;
  let character: Character;
  let character2: Character;

  beforeEach(() => {
    engine = new GameBuilder().addCharacter({ name: 'CHARACTER_1' }).addCharacter({ name: 'CHARACTER_2' }).build();
    character = getCharacterByName(engine, 'CHARACTER_1');
    character2 = getCharacterByName(engine, 'CHARACTER_2');
  });

  test('Create talk activity after ', async () => {
    TalkService.offerTalk(character, character2, engine);
    await GameService.processEvents(engine, () => {});
    const offers = character2.requireComponent(OfferParty).offers;
    OfferService.makeDecision(offers[0], character2, 'ACCEPTED', engine);
    await GameService.processEvents(engine, () => {});

    expect(character.requireComponent(ActivityParticipant).activities.getArray()[0]).toBeInstanceOf(TalkActivity);
    expect(character.requireComponent(ActivityParticipant).activities.getArray()[0].participants.getArray()).toEqual([
      character.requireComponent(ActivityParticipant),
      character2.requireComponent(ActivityParticipant)
    ]);
  });
});
