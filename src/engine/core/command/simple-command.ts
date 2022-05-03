import type { Action } from '../action';
import { Command } from './command';

export class SimpleCommand extends Command {
  private executed = false;

  constructor(private readonly action: Action) {
    super();
  }

  override getNextAction(): Action | undefined {
    if (this.executed) {
      return undefined;
    }
    this.executed = true;
    return this.action;
  }
}
