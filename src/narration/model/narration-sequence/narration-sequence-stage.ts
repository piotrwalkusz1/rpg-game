import type { NarrationSequenceStageExecutionResult } from './narration-sequence-stage-execution-result';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';

export abstract class NarrationSequenceStage {
  abstract execute(context: NarrationActionExecutionContext): NarrationSequenceStageExecutionResult;
}
