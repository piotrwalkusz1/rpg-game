import { Action } from '../../../../action/model/action';
import { CharacterAction } from '../../../../action/model/character-action';
import { ActionService } from '../../../../action/service/action-service';
import type { Character } from '../../../../character/model/character';
import type { GameState } from '../../../../game/model/game-state';
import { NarrationAction } from '../../narration-actions/narration-action';
import { NarrationDescription } from '../../narration-description';
import type { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionParams } from '../narration-sequence-stage-execution-params';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class ActionNarrationSequenceStage implements NarrationSequenceStage {
  readonly action: (gameState: GameState) => Action;

  constructor(action: Action | ((gameState: GameState) => Action)) {
    this.action = action instanceof Action ? () => action : action;
  }

  execute({ narrationSequence, context }: NarrationSequenceStageExecutionParams): NarrationSequenceStageExecutionResult {
    const action = this.action(context.gameState);
    const scheduleActionResult = ActionService.scheduleAction(action, context);
    switch (scheduleActionResult.type) {
      case 'SUCCESS':
        if (action instanceof CharacterAction) {
          return this.waitUntilNextActionPossible(action.character);
        }
        return { type: 'NEXT_STAGE' };
      case 'PREVENTION':
        return {
          type: 'PLAYER_TURN',
          scene: {
            description: scheduleActionResult.description,
            actions: [
              new NarrationAction({
                name: 'NARRATION.COMMON.OK',
                narrationSequence,
                narrationStages: []
              })
            ]
          }
        };
      case 'CANNOT_EXECUTE':
        return {
          type: 'PLAYER_TURN',
          scene: {
            description: new NarrationDescription('NARRATION.ACTION_CANNOT_BE_PERFORMED'),
            actions: [
              new NarrationAction({
                name: 'NARRATION.COMMON.OK',
                narrationSequence,
                narrationStages: []
              })
            ]
          }
        };
    }
  }

  private waitUntilNextActionPossible(character: Character): NarrationSequenceStageExecutionResult {
    if (character.pendingAction === undefined) {
      return { type: 'NEXT_STAGE' };
    } else {
      return {
        type: 'WAIT',
        scene: { description: new NarrationDescription('NARRATION.WAITING_FOR_END_OF_ACTION') },
        pendingStage: { execute: () => this.waitUntilNextActionPossible(character) }
      };
    }
  }
}
