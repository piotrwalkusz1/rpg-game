import { Action } from '../../action/model/actions/action';
import type { GameState } from '../../game/model/game-state';
import { Dialogue, DialogueTranslationKey } from './dialogue';

export type DialogueOptionCondition = () => boolean;

export class DialogueOption {
  readonly prompt: DialogueTranslationKey;
  readonly dialogueProvider: () => Dialogue | undefined;
  readonly condition: DialogueOptionCondition;
  readonly action?: (gameState: GameState) => Action;

  constructor({
    prompt,
    dialogue,
    condition,
    action
  }: {
    prompt: DialogueTranslationKey;
    dialogue?: Dialogue | (() => Dialogue | undefined);
    condition?: DialogueOptionCondition;
    action?: Action | ((gameState: GameState) => Action);
  }) {
    this.prompt = prompt;
    this.dialogueProvider = dialogue === undefined || dialogue instanceof Dialogue ? () => dialogue : dialogue;
    this.condition = condition || (() => true);
    this.action = action === undefined ? undefined : action instanceof Action ? () => action : action;
  }
}
