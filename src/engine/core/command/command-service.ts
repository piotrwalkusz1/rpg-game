import type { Engine } from '../ecs';
import { GameEventQueue } from '../game';
import { TimeManager } from '../time';
import type { Command } from './command';
import { CommandScheduledEvent } from './command-event';
import type { CommandExecutor } from './command-executor';

export namespace CommandService {
  export const scheduleCommand = (command: Command, executor: CommandExecutor, engine: Engine): void => {
    const time = engine.requireComponent(TimeManager).time;
    engine.requireComponent(GameEventQueue).addEvent(new CommandScheduledEvent({ time, command, executor }));
  };
}
