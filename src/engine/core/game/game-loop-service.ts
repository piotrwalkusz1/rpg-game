import type { GameEvent } from 'engine/core/game/game-event';
import type { GameEngine } from './game-engine';

export namespace GameLoopService {
  export const processNextEvent = async (engine: GameEngine): Promise<void> => {
    const event: GameEvent | undefined = engine.eventQueue.popNextEvent();
    if (!event) {
      return;
    }
    await engine.processEvent(event);
  };
}
