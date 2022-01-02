import type { Position } from '../../../map/model/position';
import type { ActionExecutionContext } from '../action-execution-context';
import { Action, ActionResultEvent } from './action';

export class GoActionResultEvent extends ActionResultEvent {}

export class GoAction extends Action {
  constructor(readonly position: Position) {
    super();
  }

  execute(actionExecutionContext: ActionExecutionContext): GoActionResultEvent {
    actionExecutionContext.changePlayerPosition(this.position);
    return new GoActionResultEvent();
  }
}
