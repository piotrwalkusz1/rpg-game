import type { NarrationSequenceScene } from '../narration-sequence-scene';
import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class SceneNarrationSequenceStage extends NarrationSequenceStage {
  constructor(private readonly scene: NarrationSequenceScene) {
    super();
  }

  override execute(): NarrationSequenceStageExecutionResult {
    return { type: 'SCENE', scene: this.scene };
  }
}
