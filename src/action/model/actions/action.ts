import type { ActionExecutionContext } from '../action-execution-context';

export abstract class ActionResultEvent {}

export abstract class Action {
  abstract execute(actionExecutionContext: ActionExecutionContext): ActionResultEvent;
}
