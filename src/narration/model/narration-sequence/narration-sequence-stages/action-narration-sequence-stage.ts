import { Action } from '../../../../action/model/action';
import { ActionService } from '../../../../action/service/action-service';
import type { GameState } from '../../../../game/model/game-state';
import { NarrationAction } from '../../narration-actions/narration-action';
import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionContext } from '../narration-sequence-stage-execution-context';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class ActionNarrationSequenceStage extends NarrationSequenceStage {
  readonly action: (gameState: GameState) => Action;

  constructor(action: Action | ((gameState: GameState) => Action)) {
    super();
    this.action = action instanceof Action ? () => action : action;
  }

  override execute(context: NarrationSequenceStageExecutionContext): NarrationSequenceStageExecutionResult {
    const result = ActionService.scheduleAction(this.action(context.gameContext.getGameState()), context.gameContext);
    switch (result.type) {
      case 'SUCCESS':
        return { type: 'NEXT_STAGE' };
      case 'PREVENTION':
        return {
          type: 'SCENE',
          scene: {
            description: result.description,
            actions: [
              new NarrationAction({
                name: 'NARRATION.COMMON.OK',
                narrationSequence: context.narrationSequence,
                narrationStages: []
              })
            ]
          }
        };
    }
  }
}
