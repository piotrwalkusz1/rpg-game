import { CDIContainer } from 'cdi-container';
import type { GameEngine } from 'engine/core/game';
import { Interaction, InteractionEvent } from 'engine/modules/interaction';
import { InteractionNarrationOption } from 'frontend/narration/narration-options/interaction-narration-option';
import { GameBuilder, getPlayer } from 'game';

describe('InteractionNarrationOption', () => {
  class MockInteraction extends Interaction {}

  let engine: GameEngine;

  beforeEach(() => {
    engine = CDIContainer.default().get(GameBuilder).build();
  });

  describe('onClick method', () => {
    it('schedule and process event', async () => {
      const interaction = new MockInteraction();
      const interactionNarrationOption = new InteractionNarrationOption({
        name: { literal: '' },
        image: '/images/characters/001_Eladin.png',
        interaction
      });
      let eventsProcessed = false;

      await interactionNarrationOption.onClick({
        engine,
        processEvents: async () => {
          eventsProcessed = true;
        },
        setNarrationContext: () => {
          throw new Error('setNarrationContext should not be invoked');
        }
      });

      expect(eventsProcessed).toBe(true);
      expect(engine.events).toEqual([new InteractionEvent({ time: engine.time, executor: getPlayer(engine), interaction })]);
    });
  });
});
