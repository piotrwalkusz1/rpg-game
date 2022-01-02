import type { DetectableEvent } from '../../../detector/model/detectable-event';
import type { ActionExecutionContext } from '../action-execution-context';
import type { DetectorContext } from '../../../detector/model/detector-context';

export abstract class ActionScheduledEvent implements DetectableEvent {
  abstract get detectorContexts(): DetectorContext[];
}

export abstract class ActionResultEvent implements DetectableEvent {
  abstract get detectorContexts(): DetectorContext[];
}

export abstract class Action {
  abstract execute(actionExecutionContext: ActionExecutionContext): ActionResultEvent;

  getActionScheduledEvent(_actionExecutionContext: ActionExecutionContext): ActionScheduledEvent | undefined {
    return undefined;
  }
}
