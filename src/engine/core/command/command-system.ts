import { ActionExecutedEvent, ActionService } from '../action';
import { ECSEvent, Engine, System } from '../ecs';
import { GameUtils } from '../game';
import type { Command } from './command';
import { CommandEndedEvent, CommandScheduledEvent, CommandStartedEvent } from './command-event';
import { CommandExecutor } from './command-executor';

export class CommandSystem extends System {
  override async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof CommandScheduledEvent) {
      this.handleCommandScheduledEvent(event, engine);
    } else if (event instanceof ActionExecutedEvent) {
      this.handleActionExecutedEvent(event, engine);
    }
  }

  private handleCommandScheduledEvent(event: CommandScheduledEvent, engine: Engine): void {
    if (event.executor.pendingCommand !== undefined) {
      return;
    }
    const actionScheduledSuccessfully = this.scheduleNextAction(event.command, engine);
    if (actionScheduledSuccessfully) {
      event.executor.pendingCommand = event.command;
      GameUtils.addEventToQueue(engine, new CommandStartedEvent({ ...event }));
    }
  }

  private handleActionExecutedEvent(event: ActionExecutedEvent, engine: Engine): void {
    const command = event.executor.getComponent(CommandExecutor)?.pendingCommand;
    if (!command) {
      return;
    }
    const actionScheduledSuccessfully = this.scheduleNextAction(command, engine);
    if (!actionScheduledSuccessfully) {
      command.executor.pendingCommand = undefined;
      GameUtils.addEventToQueue(engine, new CommandEndedEvent({ time: event.time, command }));
    }
  }

  private scheduleNextAction(command: Command, engine: Engine): boolean {
    const action = command.getNextAction();
    return action ? ActionService.scheduleAction(action, engine) : false;
  }
}
