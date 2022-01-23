import type { Action } from '../../../action/model/action';
import { CharacterAction } from '../../../action/model/character-action';
import { ActionService } from '../../../action/service/action-service';
import { AIService } from '../../../ai/service/ai-service';
import type { GameContext } from '../game-context';
import { GameEvent } from '../game-event';

export class ExecuteActionGameEvent extends GameEvent {
  readonly action: Action;

  constructor({ time, action }: { time: Date; action: Action }) {
    super({ time });
    this.action = action;
  }

  override async process(context: GameContext): Promise<void> {
    await ActionService.executeAction(this.action, context);
    if (this.action instanceof CharacterAction) {
      const character = this.action.character;
      character.pendingAction = undefined;
      if (character !== context.player) {
        AIService.executeTurn(character, context);
      }
    }
  }
}
