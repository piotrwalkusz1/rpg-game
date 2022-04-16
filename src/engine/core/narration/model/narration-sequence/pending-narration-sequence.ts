import type { NarrationSequence } from './narration-sequence';
import type { NarrationSequenceScene } from './narration-sequence-scene';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export interface PendingNarrationSequence {
  readonly pendingStage?: NarrationSequenceStage;
  readonly scene: NarrationSequenceScene;
  readonly narrationSequence: NarrationSequence;
  readonly narrationStages: NarrationSequenceStage[];
}
