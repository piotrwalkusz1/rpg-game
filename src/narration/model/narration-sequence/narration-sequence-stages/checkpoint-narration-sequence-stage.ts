import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionContext } from '../narration-sequence-stage-execution-context';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class CheckpointNarrationSequenceStage extends NarrationSequenceStage {
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
    super();
    this.checkpointStages = commonStages ? [...checkpointStages, ...commonStages] : checkpointStages;
    this.nextStages = commonStages ? [...nextStages, ...commonStages] : nextStages;
  }

  override execute(context: NarrationSequenceStageExecutionContext): NarrationSequenceStageExecutionResult {
    context.narrationSequence.checkpointStages = this.checkpointStages;
    return { type: 'NEXT_STAGE', nextStages: this.nextStages };
  }
}
