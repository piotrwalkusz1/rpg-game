import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class CheckpointNarrationSequenceStage extends NarrationSequenceStage {
  constructor(private readonly hook: () => void) {
    super();
  }

  override execute(): NarrationSequenceStageExecutionResult {
    this.hook();
    return { type: 'NEXT_STAGE' };
  }
}
