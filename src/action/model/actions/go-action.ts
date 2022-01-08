import { ArrayUtils } from '../../../common/array-utils';
import type { Position } from '../../../map/model/position';
import type { ActionExecutionContext } from '../action-execution-context';
import { Action, ActionResultEvent, ActionScheduledEvent } from './action';

export class GoActionScheduledEvent extends ActionScheduledEvent {
  constructor(readonly newPosition: Position, readonly oldPosition: Position | undefined) {
    super({ visibilityPositions: ArrayUtils.filterNotNull([newPosition, oldPosition]) });
  }

  override get detectablePositions(): Position[] {
    return ArrayUtils.filterNotNull([this.newPosition, this.oldPosition]);
  }
}

export class GoActionResultEvent extends ActionResultEvent {
  constructor(readonly newPosition: Position, readonly oldPosition: Position | undefined) {
    super({ visibilityPositions: ArrayUtils.filterNotNull([newPosition, oldPosition]) });
  }

  override get detectablePositions(): Position[] {
    return ArrayUtils.filterNotNull([this.newPosition, this.oldPosition]);
  }
}

export class GoAction extends Action {
  constructor(readonly position: Position) {
    super();
  }

  execute(actionExecutionContext: ActionExecutionContext): GoActionResultEvent {
    const oldPosition = actionExecutionContext.getGameState().player.character.position;
    actionExecutionContext.changePlayerPosition(this.position);
    return new GoActionResultEvent(this.position, oldPosition);
  }

  getActionScheduledEvent(actionExecutionContext: ActionExecutionContext): ActionScheduledEvent | undefined {
    const oldPosition = actionExecutionContext.getGameState().player.character.position;
    return new GoActionScheduledEvent(this.position, oldPosition);
  }
}
