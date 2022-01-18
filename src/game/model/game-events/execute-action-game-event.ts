import type { Action } from '../../../action/model/action';
import { ActionService } from '../../../action/service/action-service';
import type { GameContext } from '../game-context';
import { GameEvent } from '../game-event';
import type { GameEventHandleResult } from '../game-event-handle-result';

export class ExecuteActionGameEvent extends GameEvent {
  readonly action: Action;

  constructor({ time, action }: { time: Date; action: Action }) {
    super({ time });
    this.action = action;
  }

  override process(context: GameContext): GameEventHandleResult {
    ActionService.executeAction(this.action, context);
    return { type: 'PROCESS_NEXT_EVENT' };
  }
}
