import type { ActionService } from '../action';
import type { GameEngine } from '../game';
import type { Command } from './command';
import { CommandEndedEvent, CommandStartedEvent } from './command-event';
import type { CommandExecutor } from './command-executor';

export class CommandService {
  constructor(private actionService: ActionService) {}

  startCommand(command: Command, commandExecutor: CommandExecutor, engine: GameEngine): boolean {
    const actionStarted = this.startNextAction(command, commandExecutor, engine);
    if (actionStarted) {
      commandExecutor.pendingCommand = command;
      engine.addEvent(new CommandStartedEvent({ time: engine.time, command, executor: commandExecutor }));
    }
    return actionStarted;
  }

  continueCommand(commandExecutor: CommandExecutor, engine: GameEngine): boolean {
    const command = commandExecutor.pendingCommand;
    if (!command) {
      return false;
    }
    const actionStarted = this.startNextAction(command, commandExecutor, engine);
    if (!actionStarted) {
      commandExecutor.pendingCommand = undefined;
      engine.addEvent(new CommandEndedEvent({ time: engine.time, command, executor: commandExecutor }));
    }
    return actionStarted;
  }

  private startNextAction(command: Command, commandExecutor: CommandExecutor, engine: GameEngine): boolean {
    const action = command.getNextAction(commandExecutor);
    return action ? this.actionService.startAction(action, commandExecutor.actionExecutor, engine) : false;
  }
}
