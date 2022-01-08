import type { DetectableEvent } from '../../../detector/model/detectable-event';
import type { Position } from '../../../map/model/position';
import type { NarrationDescription } from '../../../narration/model/narration-description';
import type { ObservableObject } from '../../../vision/model/observable-object';
import type { ObservableTrait } from '../../../vision/model/observable-trait';
import { PositionBasedObservableTrait } from '../../../vision/model/observable-traits/position-based-observable-trait';
import type { ActionExecutionContext } from '../action-execution-context';

export abstract class ActionScheduledEvent implements DetectableEvent, ObservableObject {
  readonly observableTraits: ObservableTrait[];
  preventionNarrationDescription?: NarrationDescription;

  constructor({ visibilityPositions }: { visibilityPositions: Position[] }) {
    this.observableTraits = [new PositionBasedObservableTrait(visibilityPositions)];
  }

  abstract get detectablePositions(): Position[];

  setPreventionNarrationDescription(preventionNarrationDescription: NarrationDescription) {
    this.preventionNarrationDescription = preventionNarrationDescription;
  }
}

export abstract class ActionResultEvent implements DetectableEvent, ObservableObject {
  readonly observableTraits: ObservableTrait[];

  constructor({ visibilityPositions }: { visibilityPositions: Position[] }) {
    this.observableTraits = [new PositionBasedObservableTrait(visibilityPositions)];
  }

  abstract get detectablePositions(): Position[];
}

export abstract class Action {
  abstract execute(actionExecutionContext: ActionExecutionContext): ActionResultEvent;

  getActionScheduledEvent(_FactionExecutionContext: ActionExecutionContext): ActionScheduledEvent | undefined {
    return undefined;
  }
}
