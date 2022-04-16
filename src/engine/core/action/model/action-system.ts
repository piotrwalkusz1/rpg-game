import { ActionService, CharacterAction } from 'engine/core/action';
import { AIService } from 'engine/core/ai/service/ai-service';
import { ECSEvent, System } from 'engine/core/ecs';
import { ExecuteActionGameEvent } from 'engine/core/game/model/game-events/execute-action-game-event';

export class ActionSystem extends System {
  async processEvent(event: ECSEvent): Promise<void> {
    if (event instanceof ExecuteActionGameEvent) {
      await this.processExecuteActionEvent(event);
    }
  }

  private async processExecuteActionEvent(event: ExecuteActionGameEvent): Promise<void> {
    if (event.action instanceof CharacterAction) {
      await ActionService.executeAction(event.action, event.gameContext);
      const character = event.action.character;
      character.pendingAction = undefined;
      if (character !== event.gameContext.player) {
        AIService.executeTurn(character, event.gameContext);
      }
    }
  }
}
