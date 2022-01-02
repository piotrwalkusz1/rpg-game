import type { DetectableEvent } from '../../../detector/model/detectable-event';
import type { DetectorContext } from '../../../detector/model/detector-context';
import type { NarrationDescription } from '../../../narration/model/narration-description';
import type { ActionExecutionContext } from '../action-execution-context';

export abstract class ActionScheduledEvent implements DetectableEvent {
  preventionNarrationDescription?: NarrationDescription;

  abstract get detectorContexts(): DetectorContext[];

  setPreventionNarrationDescription(preventionNarrationDescription: NarrationDescription) {
    this.preventionNarrationDescription = preventionNarrationDescription;
  }
}

export abstract class ActionResultEvent implements DetectableEvent {
  abstract get detectorContexts(): DetectorContext[];
}

export abstract class Action {
  abstract execute(actionExecutionContext: ActionExecutionContext): ActionResultEvent;

  getActionScheduledEvent(_FactionExecutionContext: ActionExecutionContext): ActionScheduledEvent | undefined {
    return undefined;
  }
}
