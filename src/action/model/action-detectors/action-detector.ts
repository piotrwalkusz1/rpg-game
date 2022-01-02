import type { ActionResultEvent } from '../actions/action';

export abstract class ActionDetector {
  abstract isActionDetected(actionResultEvent: ActionResultEvent): boolean;
}
