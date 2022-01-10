import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';
import type { NarrationSequenceScene } from '../narration-sequence-scene';

export class SceneNarrationSequenceStage extends NarrationSequenceStage {
  constructor(readonly scene: NarrationSequenceScene) {
    super();
  }

  override execute(): NarrationSequenceStageExecutionResult {
    return { type: 'SCENE', scene: this.scene };
  }
}
