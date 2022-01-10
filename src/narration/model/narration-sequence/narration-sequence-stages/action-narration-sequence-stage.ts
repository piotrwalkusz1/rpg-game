import { Action } from '../../../../action/model/actions/action';
import { ActionService } from '../../../../action/service/action-service';
import type { GameState } from '../../../../game/model/game-state';
import { NarrationSequenceScene } from '../narration-sequence-scene';
import { NarrationSequenceSceneAction } from '../narration-sequence-scene-action';
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
    const result = ActionService.executeAction(this.action(context.getGameState()), context);
    switch (result.type) {
      case 'SUCCESS':
        return { type: 'NEXT_STAGE' };
      case 'PREVENTION':
        return {
          type: 'SCENE',
          scene: new NarrationSequenceScene(result.description, [
            new NarrationSequenceSceneAction({ translationKey: 'NARRATION.COMMON.OK' })
          ])
        };
    }
  }
}
