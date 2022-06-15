import { CDIContainer } from 'cdi-container';
import type { GameEngine } from 'engine/core/game';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { MovementNarrationProvider } from 'frontend/narration/narration-providers/movement-narration-provider';
import { GameBuilder, getPlayer } from 'game';
import { mockField } from 'test/mock/mock-field';

describe('MovementNarrationProvider', () => {
  let movementNarrationProvider: MovementNarrationProvider;
  let engine: GameEngine;

  beforeEach(() => {
    movementNarrationProvider = new MovementNarrationProvider();
    engine = CDIContainer.default().get(GameBuilder).build();
  });

  describe('getNarrationOptions', () => {
    it('should return empty array if player is not on any field', () => {
      getPlayer(engine).field = undefined;
      const context = new FieldNarrationContext(mockField());

      const narrationOptions = movementNarrationProvider.getNarrationOptions({ context, engine });

      expect(narrationOptions).toEqual([]);
    });
  });
});
