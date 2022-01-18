import { Action } from '../../../../action/model/action';
import { CharacterAction } from '../../../../action/model/character-action';
import { ActionService } from '../../../../action/service/action-service';
import type { GameState } from '../../../../game/model/game-state';
import { NarrationAction } from '../../narration-actions/narration-action';
import { NarrationDescription } from '../../narration-description';
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
    const action = this.action(context.gameContext.getGameState());
    const result = ActionService.scheduleAction(action, context.gameContext);
    switch (result.type) {
      case 'SUCCESS':
        if (action instanceof CharacterAction) {
          return {
            type: 'WAIT',
            condition: () => action.character.currentAction === undefined,
            waitingScene: { description: new NarrationDescription('NARRATION.WAITING_FOR_END_OF_ACTION') }
          };
        } else {
          return { type: 'NEXT_STAGE' };
        }
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
