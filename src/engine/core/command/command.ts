import type { Action } from '../action';
import type { CommandExecutor } from './command-executor';

export abstract class Command {
  readonly executor: CommandExecutor;

  constructor({ executor }: { executor: CommandExecutor }) {
    this.executor = executor;
  }

  abstract getNextAction(): Action | undefined;
}
