import type { ActionTrigger } from '../action-triggers/action-trigger';

export abstract class ActionDetector {
  abstract isActionDetected(actionTrigger: ActionTrigger): boolean;
}
