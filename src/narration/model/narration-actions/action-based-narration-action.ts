import type { Action } from '../../../action/model/actions/action';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import { NarrationAction } from './narration-action';

export abstract class ActionBasedNarrationAction extends NarrationAction {
  execute(narrationActionExecutionContext: NarrationActionExecutionContext) {
    this.getAction()?.execute(narrationActionExecutionContext);
  }

  protected abstract getAction(): Action | undefined;
}
