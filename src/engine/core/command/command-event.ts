import { GameEvent } from '../game';
import type { Command } from './command';
import type { CommandExecutor } from './command-executor';

export class CommandEvent extends GameEvent {
  readonly command: Command;
  readonly executor: CommandExecutor;

  constructor({ time, command, executor }: { time: Date; command: Command; executor: CommandExecutor }) {
    super({ time });
    this.command = command;
    this.executor = executor;
  }
}

export class CommandScheduledEvent extends CommandEvent {}

export class CommandStartedEvent extends CommandEvent {}

export class CommandEndedEvent extends CommandEvent {}
