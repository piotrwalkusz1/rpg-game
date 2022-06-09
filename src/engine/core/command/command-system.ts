import { ActionExecutedEvent, ActionExecutor, ActionService } from '../action';
import type { ECSEvent } from '../ecs';
import { GameEngine, GameSystem, GameUtils } from '../game';
import type { Command } from './command';
import { CommandEndedEvent, CommandScheduledEvent, CommandStartedEvent } from './command-event';
import { CommandExecutor } from './command-executor';

export class CommandSystem extends GameSystem {
  override async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof CommandScheduledEvent) {
      this.handleCommandScheduledEvent(event, engine);
    } else if (event instanceof ActionExecutedEvent) {
      this.handleActionExecutedEvent(event, engine);
    }
  }

  private handleCommandScheduledEvent({ time, command, executor }: CommandScheduledEvent, engine: GameEngine): void {
    if (executor.pendingCommand !== undefined) {
      return;
    }
    const actionScheduledSuccessfully = this.scheduleNextAction(command, executor, engine);
    if (actionScheduledSuccessfully) {
      executor.pendingCommand = command;
      GameUtils.addEventToQueue(engine, new CommandStartedEvent({ time, command, executor }));
    }
  }

  private handleActionExecutedEvent({ time, executor }: ActionExecutedEvent, engine: GameEngine): void {
    const commandExecutor = executor.getComponent(CommandExecutor);
    const command = commandExecutor?.pendingCommand;
    if (!command) {
      return;
    }
    const actionScheduledSuccessfully = this.scheduleNextAction(command, commandExecutor, engine);
    if (!actionScheduledSuccessfully) {
      commandExecutor.pendingCommand = undefined;
      GameUtils.addEventToQueue(engine, new CommandEndedEvent({ time, command, executor: commandExecutor }));
    }
  }

  private scheduleNextAction(command: Command, executor: CommandExecutor, engine: GameEngine): boolean {
    const action = command.getNextAction(executor);
    const actionExecutor = executor.getComponent(ActionExecutor);
    return action && actionExecutor ? ActionService.scheduleAction(action, actionExecutor, engine) : false;
  }
}
