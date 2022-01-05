import type { Action } from '../../../action/model/actions/action';
import { ActionService } from '../../../action/service/action-service';
import type { GameState } from '../../../game/model/game-state';
import { Narration } from '../narration';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import { CustomNarrationAction } from './custom-narration-action';
import { TemplateNarrationAction } from './template-narration-action';

export abstract class ActionBasedNarrationAction extends TemplateNarrationAction {
  execute(narrationActionExecutionContext: NarrationActionExecutionContext): Narration | undefined {
    const action = this.getAction(narrationActionExecutionContext.getGameState());
    const result = ActionService.executeAction(action, narrationActionExecutionContext);
    switch (result.type) {
      case 'SUCCESS':
        return this.getNextNarration();
      case 'PREVENTION':
        return new Narration({
          title: narrationActionExecutionContext.getNarration()?.title || '',
          description: result.description,
          actions: [
            new CustomNarrationAction({
              name: { translationKey: 'NARRATION.COMMON.OK' },
              nextNarration: narrationActionExecutionContext.getNarration()
            })
          ],
          isActionRequired: narrationActionExecutionContext.getNarration()?.isActionRequired
        });
    }
  }

  protected abstract getAction(gameState: GameState): Action;

  protected getNextNarration(): Narration | undefined {
    return undefined;
  }
}
