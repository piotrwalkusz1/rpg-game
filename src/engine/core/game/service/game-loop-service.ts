import type { GameEvent } from 'engine/core/game';
import { GameEventQueue } from 'engine/core/game/model/game-event-queue';
import type { GameContext } from '../model/game-context';

export namespace GameLoopService {
  export const processNextEvent = async (context: GameContext): Promise<void> => {
    const event: GameEvent | undefined = context.engine.getComponent(GameEventQueue)?.popNextEvent();
    if (!event) {
      return;
    }
    await context.engine.processEvent(event);
  };
}
