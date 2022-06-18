import { ActionExecutor, PendingAction } from '../action';
import { Component, Engine } from '../ecs';
import type { Command } from './command';

export class CommandExecutor extends Component {
  readonly actionExecutor: ActionExecutor;
  pendingCommand: Command | undefined;

  constructor({ actionExecutor }: { actionExecutor: ActionExecutor }) {
    super();
    this.actionExecutor = actionExecutor;
  }

  static create(engine: Engine): CommandExecutor {
    const actionExecutor = new ActionExecutor();
    const commandExecutor = new CommandExecutor({ actionExecutor });
    engine.addEntityWithComponents([actionExecutor, commandExecutor]);
    return commandExecutor;
  }

  get pendingAction(): PendingAction | undefined {
    return this.actionExecutor.pendingAction;
  }
}
