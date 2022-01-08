import type { DetectableEvent } from '../../../detector/model/detectable-event';
import type { Position } from '../../../map/model/position';
import type { NarrationDescription } from '../../../narration/model/narration-description';
import type { Trait } from '../../../trait/model/trait';
import type { TraitOwner } from '../../../trait/model/trait-owner';
import { PositionBasedObservableTrait } from '../../../trait/vision/model/observable-traits/position-based-observable-trait';
import type { ActionExecutionContext } from '../action-execution-context';

export abstract class ActionScheduledEvent implements DetectableEvent, TraitOwner {
  readonly traits: Trait[];
  preventionNarrationDescription?: NarrationDescription;

  constructor({ visibilityPositions }: { visibilityPositions: Position[] }) {
    this.traits = [new PositionBasedObservableTrait(visibilityPositions)];
  }

  abstract get detectablePositions(): Position[];

  setPreventionNarrationDescription(preventionNarrationDescription: NarrationDescription) {
    this.preventionNarrationDescription = preventionNarrationDescription;
  }
}

export abstract class ActionResultEvent implements DetectableEvent, TraitOwner {
  readonly traits: Trait[];

  constructor({ visibilityPositions }: { visibilityPositions: Position[] }) {
    this.traits = [new PositionBasedObservableTrait(visibilityPositions)];
  }

  abstract get detectablePositions(): Position[];
}

export abstract class Action {
  abstract execute(actionExecutionContext: ActionExecutionContext): ActionResultEvent;

  getActionScheduledEvent(_FactionExecutionContext: ActionExecutionContext): ActionScheduledEvent | undefined {
    return undefined;
  }
}
