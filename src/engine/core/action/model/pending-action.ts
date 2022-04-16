import type { CharacterAction } from './character-action';
import type { ExecuteActionGameEvent } from '../../game/model/game-events/execute-action-game-event';

export class PendingAction {
  readonly action: CharacterAction;
  readonly scheduleTime: Date;
  readonly executionEvent: ExecuteActionGameEvent;

  constructor({
    action,
    scheduleTime,
    executionEvent
  }: {
    action: CharacterAction;
    scheduleTime: Date;
    executionEvent: ExecuteActionGameEvent;
  }) {
    this.action = action;
    this.scheduleTime = scheduleTime;
    this.executionEvent = executionEvent;
  }
}
