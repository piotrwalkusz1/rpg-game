import type { NarrationSequenceStage } from './narration-sequence-stage';

export interface SingleOutputNarrationSequenceStage {
  getNextStage(): NarrationSequenceStage;
}
