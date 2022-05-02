import type { Engine } from '../ecs';
import type { GameEvent } from './game-event';
import { GameEventQueue } from './game-event-queue';

export namespace GameUtils {
  export const addEventToQueue = (engine: Engine, event: GameEvent): void => {
    engine.getComponent(GameEventQueue)?.addEvent(event);
  };
}
