import type { GameEngine } from '../game';
import type { Command } from './command';
import { CommandScheduledEvent } from './command-event';
import type { CommandExecutor } from './command-executor';

export namespace CommandService {
  export const scheduleCommand = (command: Command, executor: CommandExecutor, engine: GameEngine): void => {
    engine.addEvent(new CommandScheduledEvent({ time: engine.time, command, executor }));
  };
}
