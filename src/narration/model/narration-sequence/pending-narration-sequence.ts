import type { GameState } from '../../../game/model/game-state';
import type { NarrationSequence } from './narration-sequence';
import type { NarrationSequenceScene } from './narration-sequence-scene';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export interface PendingNarrationSequence {
  readonly condition: (gameState: GameState) => boolean;
  readonly scene: NarrationSequenceScene;
  readonly narrationSequence: NarrationSequence;
  readonly narrationStages: NarrationSequenceStage[];
}
