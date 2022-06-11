import type { PendingAction } from 'engine/core/action';
import type { Command } from 'engine/core/command';
import type { Engine } from 'engine/core/ecs';
import { GameEngine, GameLoopService } from 'engine/core/game';
import { differentTime, sameTime } from 'engine/core/time/time-utils';
import { getPlayer } from 'game';

export namespace GameService {
  export const processEvents = async (engine: GameEngine, refreshEngine: () => void): Promise<void> => {
    refreshEngine();
    while (engine.nextEvent) {
      await processEventsUntilTimeChange(engine, refreshEngine);
      if (isPlayerActionRequired(engine)) {
        break;
      }
    }
  };

  const processEventsUntilTimeChange = async (engine: GameEngine, refreshEngine: () => void): Promise<void> => {
    if (differentTime(engine.nextEventTime, engine.time)) {
      await processNextEvent(engine, refreshEngine);
    }
    while (sameTime(engine.nextEventTime, engine.time)) {
      await processNextEvent(engine, refreshEngine);
    }
  };

  const processNextEvent = async (engine: Engine, refreshEngine: () => void): Promise<void> => {
    await GameLoopService.processNextEvent(engine);
    refreshEngine();
  };

  const isPlayerActionRequired = (engine: Engine): boolean => {
    return !playerPendingAction(engine) && !playerPendingCommand(engine);
  };

  const playerPendingAction = (engine: Engine): PendingAction | undefined => getPlayer(engine).pendingAction;

  const playerPendingCommand = (engine: Engine): Command | undefined => getPlayer(engine).pendingCommand;
}
