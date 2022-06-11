import { getPlayerComponent } from 'engine/core/game';
import { Interaction, InteractionEvent, InteractionExecutor } from 'engine/modules/interaction';
import { InteractionNarrationOption } from 'frontend/narration/narration-options/interaction-narration-option';
import { MockEngine } from 'test/mock/mock-engine';

describe('InteractionNarrationOption', () => {
  class MockInteraction extends Interaction {}

  describe('onClick method', () => {
    it('schedule and process event', async () => {
      const engine = new MockEngine();
      engine.addPlayer();
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
      expect(engine.events).toEqual([
        new InteractionEvent({ time: engine.time, executor: getPlayerComponent(engine, InteractionExecutor), interaction })
      ]);
    });
  });
});
