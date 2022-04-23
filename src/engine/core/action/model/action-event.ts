import type { Action, ActionExecutor } from 'engine/core/action';
import { GameEvent } from 'engine/core/game';

export class ActionEvent extends GameEvent {
  readonly action: Action;

  constructor({ time, action }: { time: Date; action: Action }) {
    super({ time });
    this.action = action;
  }

  get executor(): ActionExecutor {
    return this.action.executor;
  }
}

export class ActionScheduledEvent extends ActionEvent {}

export class BeforeActionExecutingEvent extends ActionEvent {}

export class ActionExecutingEvent extends ActionEvent {}

export class ActionExecutedEvent extends ActionEvent {}
