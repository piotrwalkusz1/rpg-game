import type { GameContext } from '../../../game/model/game-context';
import type { NarrationSequence } from './narration-sequence';

export interface NarrationSequenceStageExecutionContext {
  gameContext: GameContext;
  narrationSequence: NarrationSequence;
}
