import type { NarrationDescription } from '../../narration-description';
import type { NarrationSequenceScene } from '../narration-sequence-scene';
import type { NarrationSequenceSceneAction } from '../narration-sequence-scene-action';
import type { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class SceneNarrationSequenceStage implements NarrationSequenceStage {
  private readonly scene: NarrationSequenceScene;

  constructor(description: NarrationDescription, actions?: NarrationSequenceSceneAction[]) {
    this.scene = { description, actions };
  }

  execute(): NarrationSequenceStageExecutionResult {
    return { type: 'PLAYER_TURN', scene: this.scene };
  }
}
