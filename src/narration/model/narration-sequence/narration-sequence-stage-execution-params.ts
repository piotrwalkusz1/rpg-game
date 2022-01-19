import type { GameContext } from '../../../game/model/game-context';
import type { NarrationSequence } from './narration-sequence';

export interface NarrationSequenceStageExecutionParams {
  readonly narrationSequence: NarrationSequence;
  readonly context: GameContext;
}
