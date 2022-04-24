import type { Engine } from 'engine/core/ecs';
import type { GameEvent } from 'engine/core/game/game-event';
import { GameEventQueue } from 'engine/core/game/game-event-queue';

export namespace GameLoopService {
  export const processNextEvent = async (engine: Engine): Promise<void> => {
    const event: GameEvent | undefined = engine.getComponent(GameEventQueue)?.popNextEvent();
    if (!event) {
      return;
    }
    await engine.processEvent(event);
  };
}
