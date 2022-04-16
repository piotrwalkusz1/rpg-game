import type { NarrationSequenceStageExecutionResult } from './narration-sequence-stage-execution-result';
import type { NarrationSequenceStageExecutionParams } from './narration-sequence-stage-execution-params';

export interface NarrationSequenceStage {
  execute(params: NarrationSequenceStageExecutionParams): NarrationSequenceStageExecutionResult;
}
