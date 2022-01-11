import type { NarrationDescription } from '../../narration-description';
import type { NarrationSequenceScene } from '../narration-sequence-scene';
import type { NarrationSequenceSceneAction } from '../narration-sequence-scene-action';
import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class SceneNarrationSequenceStage extends NarrationSequenceStage {
  private readonly scene: NarrationSequenceScene;

  constructor(description: NarrationDescription, actions?: NarrationSequenceSceneAction[]) {
    super();
    this.scene = { description, actions };
  }

  override execute(): NarrationSequenceStageExecutionResult {
    return { type: 'SCENE', scene: this.scene };
  }
}
