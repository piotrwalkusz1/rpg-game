import type { PendingAction } from 'engine/core/action';
import type { Command } from 'engine/core/command';
import type { Engine } from 'engine/core/ecs';
import { GameLoopService } from 'engine/core/game';
import { differentTime, sameTime } from 'engine/core/time/time-utils';
import type { GameStore } from 'frontend/store/game-store';
import { getPlayer } from 'game';

export namespace GameService {
  export const processEvents = async (store: GameStore): Promise<void> => {
    store.refreshEngine();
    while (store.engine.nextEvent) {
      await processEventsUntilTimeChange(store);
      if (isPlayerActionRequired(store.engine)) {
        break;
      }
    }
  };

  const processEventsUntilTimeChange = async (store: GameStore): Promise<void> => {
    if (differentTime(store.engine.nextEventTime, store.engine.time)) {
      await processNextEvent(store);
    }
    while (sameTime(store.engine.nextEventTime, store.engine.time)) {
      await processNextEvent(store);
    }
  };

  const processNextEvent = async (store: GameStore): Promise<void> => {
    await GameLoopService.processNextEvent(store.engine);
    store.refreshEngine();
  };

  const isPlayerActionRequired = (engine: Engine): boolean => {
    return !playerPendingAction(engine) && !playerPendingCommand(engine);
  };

  const playerPendingAction = (engine: Engine): PendingAction | undefined => getPlayer(engine).pendingAction;

  const playerPendingCommand = (engine: Engine): Command | undefined => getPlayer(engine).pendingCommand;
}
