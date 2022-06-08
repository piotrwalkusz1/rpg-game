import { ActivityParticipant } from 'engine/core/activity';
import type { Engine } from 'engine/core/ecs';
import { getPlayerComponent } from 'engine/core/game';
import { Character, getCharacterByName } from 'engine/modules/character';
import { InteractionService } from 'engine/modules/interaction';
import { TalkActivity } from 'engine/modules/talk';
import { TalkOfferInteraction } from 'engine/modules/talk/talk-offer-interaction';
import { GameService } from 'frontend/game';
import { GameBuilder } from 'game';

describe('Talk', () => {
  let engine: Engine;
  let player: Character;
  let otherCharacter: Character;

  beforeEach(() => {
    engine = new GameBuilder().addCharacter({ name: 'Sestia' }).build();
    player = getPlayerComponent(engine, Character);
    otherCharacter = getCharacterByName(engine, 'Sestia');
  });

  test('Character automatically accept talk offer and talk activity is started', async () => {
    InteractionService.scheduleInteraction(new TalkOfferInteraction({ interlocutor: otherCharacter }), player, engine);
    await GameService.processEvents(engine, () => {});

    const playerActivities = player.requireComponent(ActivityParticipant).activities.getArray();
    const otherCharacterActivities = otherCharacter.requireComponent(ActivityParticipant).activities.getArray();
    expect(playerActivities).toEqual(otherCharacterActivities);
    expect(playerActivities.length).toEqual(1);
    expect(playerActivities[0]).toBeInstanceOf(TalkActivity);
    expect(playerActivities[0].participants.getArray()).toEqual([
      player.requireComponent(ActivityParticipant),
      otherCharacter.requireComponent(ActivityParticipant)
    ]);
  });
});
