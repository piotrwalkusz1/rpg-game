import type { Action } from '../../../action/model/actions/action';
import { ActionExecutionService } from '../../../action/service/action-execution-service';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import { NarrationActionExecutionResult } from '../narration-action-execution-result';
import { NarrationAction } from './narration-action';

export abstract class ActionBasedNarrationAction extends NarrationAction {
  execute(narrationActionExecutionContext: NarrationActionExecutionContext): NarrationActionExecutionResult {
    const result = ActionExecutionService.execute(this.getAction(), narrationActionExecutionContext);
    switch (result.type) {
      case 'SUCCESS':
        return NarrationActionExecutionResult.NEXT_NARRATION;
      case 'PREVENTION':
        return NarrationActionExecutionResult.RESET_NARRATION;
    }
  }

  protected abstract getAction(): Action;
}
