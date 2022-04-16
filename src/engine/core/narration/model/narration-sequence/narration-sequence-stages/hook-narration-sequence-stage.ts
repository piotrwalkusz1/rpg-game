import type { GameState } from '../../../../game/model/game-state';
import type { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionParams } from '../narration-sequence-stage-execution-params';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class HookNarrationSequenceStage implements NarrationSequenceStage {
  constructor(private readonly hook: (gameState: GameState) => void) {}

  execute({ context }: NarrationSequenceStageExecutionParams): NarrationSequenceStageExecutionResult {
    this.hook(context.getGameState());
    return { type: 'NEXT_STAGE' };
  }
}
