import { GameEventQueue } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { Interaction, InteractionEvent, InteractionService } from 'engine/modules/interaction';
import { MockEngine } from 'test/mock/mock-engine';

describe('Interaction service', () => {
  class MockInteraction extends Interaction {}

  const engine = new MockEngine();
  const character = engine.addCharacter().requireComponent(Character);

  describe('executeInteraction method', () => {
    it('should add InteractionEvent to GameEventQueue', () => {
      const interaction = new MockInteraction();

      InteractionService.scheduleInteraction(interaction, character, engine);

      expect(engine.requireComponent(GameEventQueue).events).toEqual([
        new InteractionEvent({ interaction, executor: character, time: engine.time })
      ]);
    });
  });
});
