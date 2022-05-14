import { ActionExecutor, PendingAction } from 'engine/core/action';
import { Command, CommandExecutor } from 'engine/core/command';
import type { Engine } from 'engine/core/ecs';
import { GameEvent, GameEventQueue, GameLoopService, Player } from 'engine/core/game';
import { Time, TimeManager } from 'engine/core/time';

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

  const playerPendingAction = (engine: Engine): PendingAction | undefined => player(engine).requireComponent(ActionExecutor).pendingAction;

  const playerPendingCommand = (engine: Engine): Command | undefined => player(engine).requireComponent(CommandExecutor).pendingCommand;

  const player = (engine: Engine): Player => engine.requireComponent(Player);
}
