import { CDIContainer } from 'cdi-container';
import type { ActionService } from 'engine/core/action';
import type { GameEngine } from 'engine/core/game';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { MovementNarrationProvider } from 'frontend/narration/narration-providers/movement-narration-provider';
import { GameBuilder, getPlayer } from 'game';
import { mockField } from 'test/mock/mock-field';
import { IMock, Mock } from 'typemoq';

describe('MovementNarrationProvider', () => {
  let actionServiceMock: IMock<ActionService>;
  let movementNarrationProvider: MovementNarrationProvider;
  let engine: GameEngine;

  beforeEach(() => {
    actionServiceMock = Mock.ofType<ActionService>();
    movementNarrationProvider = new MovementNarrationProvider(actionServiceMock.object);
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
