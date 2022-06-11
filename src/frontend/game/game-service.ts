import type { PendingAction } from 'engine/core/action';
import type { Command } from 'engine/core/command';
import type { Engine } from 'engine/core/ecs';
import { GameEvent, GameEventQueue, GameLoopService } from 'engine/core/game';
import { Time, TimeManager } from 'engine/core/time';
import { getPlayer } from 'game';

export namespace GameService {
  export const processEvents = async (engine: Engine, refreshEngine: () => void): Promise<void> => {
    refreshEngine();
    while (nextEvent(engine)) {
      await processEventsUntilTimeChange(engine, refreshEngine);
      if (isPlayerActionRequired(engine)) {
        break;
      }
    }
  };

  const processEventsUntilTimeChange = async (engine: Engine, refreshEngine: () => void): Promise<void> => {
    if (nextEventTime(engine) !== time(engine)) {
      await processNextEvent(engine, refreshEngine);
    }
    while (nextEventTime(engine) === time(engine)) {
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

  const time = (engine: Engine): Time => engine.requireComponent(TimeManager).time;

  const nextEventTime = (engine: Engine): Time | undefined => nextEvent(engine)?.time;

  const nextEvent = (engine: Engine): GameEvent | undefined => engine.requireComponent(GameEventQueue).events[0];

  const playerPendingAction = (engine: Engine): PendingAction | undefined => getPlayer(engine).pendingAction;

  const playerPendingCommand = (engine: Engine): Command | undefined => getPlayer(engine).pendingCommand;
}
