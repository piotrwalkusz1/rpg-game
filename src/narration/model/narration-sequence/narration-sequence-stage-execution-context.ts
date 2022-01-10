import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export interface NarrationSequenceStageExecutionContext extends NarrationActionExecutionContext {
  setCheckpointStages(checkpointStages: NarrationSequenceStage[]): void;
}
