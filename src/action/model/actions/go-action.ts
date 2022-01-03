import type { Character } from '../../../character/model/character';
import { CharacterVisionService } from '../../../character/service/character-vision-service';
import { ArrayUtils } from '../../../common/array-utils';
import type { Position } from '../../../map/model/position';
import type { ActionExecutionContext } from '../action-execution-context';
import { Action, ActionResultEvent, ActionScheduledEvent } from './action';

export class GoActionScheduledEvent extends ActionScheduledEvent {
  constructor(readonly newPosition: Position, readonly oldPosition: Position | undefined) {
    super();
  }

  override get detectablePositions(): Position[] {
    return ArrayUtils.filterNotNull([this.newPosition, this.oldPosition]);
  }

  override canCharacterDetect(character: Character): boolean {
    return ArrayUtils.filterNotNull([this.newPosition, this.oldPosition]).some((position) =>
      CharacterVisionService.canCharacterSeeWhatIsHappening(character, position)
    );
  }
}

export class GoActionResultEvent extends ActionResultEvent {
  constructor(readonly newPosition: Position, readonly oldPosition: Position | undefined) {
    super();
  }

  override get detectablePositions(): Position[] {
    return ArrayUtils.filterNotNull([this.newPosition, this.oldPosition]);
  }

  override canCharacterDetect(character: Character): boolean {
    return ArrayUtils.filterNotNull([this.newPosition, this.oldPosition]).some((position) =>
      CharacterVisionService.canCharacterSeeWhatIsHappening(character, position)
    );
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
