import type { Action } from '../action';
import type { CommandExecutor } from './command-executor';

export abstract class Command {
  abstract getNextAction(executor: CommandExecutor): Action | undefined;
}
