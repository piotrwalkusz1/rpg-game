import type { Engine } from '../ecs';
import type { Command } from './command';
import type { CommandExecutor } from './command-executor';
import { CommandService } from './command-service';

export class CommandEndpoint {
  static scheduleCommand(command: Command, executor: CommandExecutor, engine: Engine): void {
    CommandService.scheduleCommand(command, executor, engine);
  }
}
