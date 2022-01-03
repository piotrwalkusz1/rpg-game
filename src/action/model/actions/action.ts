import type { Character } from '../../../character/model/character';
import type { DetectableEvent } from '../../../detector/model/detectable-event';
import type { Position } from '../../../map/model/position';
import type { NarrationDescription } from '../../../narration/model/narration-description';
import type { ActionExecutionContext } from '../action-execution-context';

export abstract class ActionScheduledEvent implements DetectableEvent {
  preventionNarrationDescription?: NarrationDescription;

  abstract get detectablePositions(): Position[];

  abstract canCharacterDetect(character: Character): boolean;

  setPreventionNarrationDescription(preventionNarrationDescription: NarrationDescription) {
    this.preventionNarrationDescription = preventionNarrationDescription;
  }
}

export abstract class ActionResultEvent implements DetectableEvent {
  abstract get detectablePositions(): Position[];

  abstract canCharacterDetect(character: Character): boolean;
}

export abstract class Action {
  abstract execute(actionExecutionContext: ActionExecutionContext): ActionResultEvent;

  getActionScheduledEvent(_FactionExecutionContext: ActionExecutionContext): ActionScheduledEvent | undefined {
    return undefined;
  }
}
