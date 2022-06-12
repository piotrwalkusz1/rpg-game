import { GameEngine } from 'engine/core/game';
import { NarrationContext, NarrationService } from 'frontend/narration';

describe('NarrationService', () => {
  class UnsupportedNarrationContext extends NarrationContext {}

  describe('getNarration', () => {
    it('should throw error if narration context is not supported', () => {
      expect(() => NarrationService.getNarration({ context: new UnsupportedNarrationContext(), engine: new GameEngine() })).toThrow(
        'Unsupported narrationContext: UnsupportedNarrationContext'
      );
    });
  });
});
