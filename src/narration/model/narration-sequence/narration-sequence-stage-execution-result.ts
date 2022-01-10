import type { NarrationSequenceScene } from './narration-sequence-scene';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export type NarrationSequenceStageExecutionResult =
  | { type: 'SCENE'; scene: NarrationSequenceScene }
  | { type: 'NEXT_STAGE'; nextStage: NarrationSequenceStage | undefined };
