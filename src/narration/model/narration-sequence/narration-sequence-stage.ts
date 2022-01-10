import type { NarrationSequenceStageExecutionContext } from './narration-sequence-stage-execution-context';
import type { NarrationSequenceStageExecutionResult } from './narration-sequence-stage-execution-result';

export abstract class NarrationSequenceStage {
  abstract execute(context: NarrationSequenceStageExecutionContext): NarrationSequenceStageExecutionResult;
}
