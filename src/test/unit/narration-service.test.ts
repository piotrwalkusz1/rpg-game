import { GameEngine } from 'engine/core/game';
import { NarrationContext, NarrationOption, NarrationService } from 'frontend/narration';
import type { GameStore } from 'frontend/store/game-store';
import { Mock } from 'moq.ts';

describe('NarrationService', () => {
  class UnsupportedNarrationContext extends NarrationContext {}

  class UnsupportedNarrationOption extends NarrationOption {
    constructor() {
      super({ name: { literal: '' }, image: '/images/ui/speech-bubble.png' });
    }
  }

  describe('getNarration', () => {
    it('should throw error if narration context is not supported', () => {
      const narrationService = new NarrationService([], []);

      expect(() => narrationService.getNarration({ context: new UnsupportedNarrationContext(), engine: new GameEngine() })).toThrow(
        'Unsupported narrationContext: UnsupportedNarrationContext'
      );
    });
  });

  describe('executeNarrationOption', () => {
    it('should throw error if executor for narration option not found', async () => {
      const narrationService = new NarrationService([], []);

      expect(() => narrationService.executeNarrationOption(new UnsupportedNarrationOption(), new Mock<GameStore>().object())).toThrow(
        new Error('NarrationOptionExecutor for type UnsupportedNarrationOption not found')
      );
    });
  });
});
