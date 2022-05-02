import type { Time } from 'engine/core/time';
import type { Action } from './action';
import type { BeforeActionExecutingEvent } from './action-event';

export class PendingAction {
  readonly action: Action;
  readonly scheduleTime: Time;
  readonly executionEvent: BeforeActionExecutingEvent;

  constructor({
    action,
    scheduleTime,
    executionEvent
  }: {
    action: Action;
    scheduleTime: Time;
    executionEvent: BeforeActionExecutingEvent;
  }) {
    this.action = action;
    this.scheduleTime = scheduleTime;
    this.executionEvent = executionEvent;
  }
}
