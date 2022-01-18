import type { GameState } from '../../../../game/model/game-state';
import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionContext } from '../narration-sequence-stage-execution-context';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class HookNarrationSequenceStage extends NarrationSequenceStage {
  constructor(private readonly hook: (gameState: GameState) => void) {
    super();
  }

  override execute(context: NarrationSequenceStageExecutionContext): NarrationSequenceStageExecutionResult {
    this.hook(context.gameContext.getGameState());
    return { type: 'NEXT_STAGE' };
  }
}
