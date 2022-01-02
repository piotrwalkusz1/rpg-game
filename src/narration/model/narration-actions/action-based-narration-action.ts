import type { Action } from '../../../action/model/actions/action';
import { ActionService } from '../../../action/service/action-service';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import { NarrationActionExecutionResult } from '../narration-action-execution-result';
import { NarrationAction } from './narration-action';

export abstract class ActionBasedNarrationAction extends NarrationAction {
  execute(narrationActionExecutionContext: NarrationActionExecutionContext): NarrationActionExecutionResult {
    const result = ActionService.executeAction(this.getAction(), narrationActionExecutionContext);
    switch (result.type) {
      case 'SUCCESS':
        return NarrationActionExecutionResult.NEXT_NARRATION;
      case 'PREVENTION':
        return NarrationActionExecutionResult.KEEP_NARRATION;
    }
  }

  protected abstract getAction(): Action;
}
