import type { GameState } from '../../../game/model/game-state';
import type { NarrationSequenceScene } from './narration-sequence-scene';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export type NarrationSequenceStageExecutionResult =
  | { type: 'SCENE'; scene: NarrationSequenceScene }
  | { type: 'NEXT_STAGE'; nextStages?: NarrationSequenceStage[] }
  | { type: 'WAIT'; condition: (gameState: GameState) => boolean; waitingScene: NarrationSequenceScene };
