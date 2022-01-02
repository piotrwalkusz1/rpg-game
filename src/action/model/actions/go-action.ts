import type { DetectorContext } from '../../../detector/model/detector-context';
import type { Position } from '../../../map/model/position';
import type { ActionExecutionContext } from '../action-execution-context';
import { Action, ActionResultEvent, ActionScheduledEvent } from './action';

export class GoActionScheduledEvent extends ActionScheduledEvent {
  constructor(readonly newPosition: Position, readonly oldPosition: Position | undefined) {
    super();
  }

  override get detectorContexts(): DetectorContext[] {
    return [...this.newPosition.detectorContexts, ...(this.oldPosition?.detectorContexts || [])];
  }
}

export class GoActionResultEvent extends ActionResultEvent {
  constructor(readonly newPosition: Position, readonly oldPosition: Position | undefined) {
    super();
  }

  override get detectorContexts(): DetectorContext[] {
    return [...this.newPosition.detectorContexts, ...(this.oldPosition?.detectorContexts || [])];
  }
}

export class GoAction extends Action {
  constructor(readonly position: Position) {
    super();
  }

  execute(actionExecutionContext: ActionExecutionContext): GoActionResultEvent {
    const oldPosition = actionExecutionContext.gameState.player.character.position;
    actionExecutionContext.changePlayerPosition(this.position);
    return new GoActionResultEvent(this.position, oldPosition);
  }

  getActionScheduledEvent(actionExecutionContext: ActionExecutionContext): ActionScheduledEvent | undefined {
    const oldPosition = actionExecutionContext.gameState.player.character.position;
    return new GoActionScheduledEvent(this.position, oldPosition);
  }
}
