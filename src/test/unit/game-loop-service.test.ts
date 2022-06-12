import { GameEngine, GameLoopService } from 'engine/core/game';

describe('GameLoopService', () => {
  describe('processNextEvent method', () => {
    it('should do nothing if there is no next event', async () => {
      const engine = new GameEngine();

      await GameLoopService.processNextEvent(engine);
    });
  });
});
