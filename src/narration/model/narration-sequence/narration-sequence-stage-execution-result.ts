import type { NarrationSequenceScene } from './narration-sequence-scene';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export type NarrationSequenceStageExecutionResult =
  | { type: 'PLAYER_TURN'; scene: NarrationSequenceScene }
  | { type: 'NEXT_STAGE'; nextStages?: NarrationSequenceStage[] }
  | {
      type: 'WAIT';
      scene: NarrationSequenceScene;
      pendingStage: NarrationSequenceStage;
    };
