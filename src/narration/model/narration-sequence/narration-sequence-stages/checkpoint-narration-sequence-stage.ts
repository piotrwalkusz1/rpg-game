import type { NarrationSequenceStageExecutionParams } from '../narration-sequence-stage-execution-params';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';
import type { NarrationSequenceStage } from '../narration-sequence-stage';

export class CheckpointNarrationSequenceStage implements NarrationSequenceStage {
  private readonly checkpointStages: NarrationSequenceStage[];
  private readonly nextStages: NarrationSequenceStage[];

  constructor({
    checkpointStages,
    nextStages,
    commonStages
  }: {
    checkpointStages: NarrationSequenceStage[];
    nextStages: NarrationSequenceStage[];
    commonStages?: NarrationSequenceStage[];
  }) {
    this.checkpointStages = commonStages ? [...checkpointStages, ...commonStages] : checkpointStages;
    this.nextStages = commonStages ? [...nextStages, ...commonStages] : nextStages;
  }

  execute({ narrationSequence }: NarrationSequenceStageExecutionParams): NarrationSequenceStageExecutionResult {
    narrationSequence.checkpointStages = this.checkpointStages;
    return { type: 'NEXT_STAGE', nextStages: this.nextStages };
  }
}
