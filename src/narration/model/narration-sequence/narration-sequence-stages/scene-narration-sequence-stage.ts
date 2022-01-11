import type { NarrationAction } from '../../narration-actions/narration-action';
import type { NarrationDescription } from '../../narration-description';
import type { NarrationSequenceScene } from '../narration-sequence-scene';
import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class SceneNarrationSequenceStage extends NarrationSequenceStage {
  private readonly scene: NarrationSequenceScene;

  constructor(description: NarrationDescription, actions?: NarrationAction[]) {
    super();
    this.scene = { description, actions };
  }

  override execute(): NarrationSequenceStageExecutionResult {
    return { type: 'SCENE', scene: this.scene };
  }
}
