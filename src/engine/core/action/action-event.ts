import { GameEvent } from 'engine/core/game';
import type { Action, ActionExecutor } from '.';

export class ActionEvent extends GameEvent {
  readonly action: Action;
  readonly executor: ActionExecutor;

  constructor({ time, action, executor }: { time: Date; action: Action; executor: ActionExecutor }) {
    super({ time });
    this.action = action;
    this.executor = executor;
  }
}

export class ActionStartedEvent extends ActionEvent {}

export class BeforeActionExecutingEvent extends ActionEvent {}

export class ActionExecutingEvent extends ActionEvent {}

export class ActionExecutedEvent extends ActionEvent {}
