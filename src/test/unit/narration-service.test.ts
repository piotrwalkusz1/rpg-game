import type { CDIContainer } from 'cdi-container';
import { GameEngine } from 'engine/core/game';
import { NarrationContext, NarrationService } from 'frontend/narration';
import { Mock } from 'moq.ts';

describe('NarrationService', () => {
  class UnsupportedNarrationContext extends NarrationContext {}

  describe('getNarration', () => {
    it('should throw error if narration context is not supported', () => {
      const narrationService = new NarrationService([], new Mock<CDIContainer>().object());

      expect(() => narrationService.getNarration({ context: new UnsupportedNarrationContext(), engine: new GameEngine() })).toThrow(
        'Unsupported narrationContext: UnsupportedNarrationContext'
      );
    });
  });
});
