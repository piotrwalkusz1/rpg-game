import type { Action } from '../../../action/model/action';
import { ActionService } from '../../../action/service/action-service';
import type { WorldContext } from '../../../game/model/world-context';
import { TimeEvent } from '../time-event';
import type { TimeEventHandleResult } from '../time-event-handle-result';

export class ExecuteActionTimeEvent extends TimeEvent {
  readonly action: Action;

  constructor({ time, action }: { time: Date; action: Action }) {
    super({ time });
    this.action = action;
  }

  override handle(context: WorldContext): TimeEventHandleResult {
    ActionService.executeAction(this.action, context);
    return { type: 'HANDLE_NEXT_EVENT' };
  }
}
