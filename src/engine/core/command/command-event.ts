import { GameEvent } from '../game';
import type { Command } from './command';
import type { CommandExecutor } from './command-executor';

export class CommandEvent extends GameEvent {
  readonly command: Command;

  constructor({ time, command }: { time: Date; command: Command }) {
    super({ time });
    this.command = command;
  }

  get executor(): CommandExecutor {
    return this.command.executor;
  }
}

export class CommandScheduledEvent extends CommandEvent {}

export class CommandStartedEvent extends CommandEvent {}

export class CommandEndedEvent extends CommandEvent {}
