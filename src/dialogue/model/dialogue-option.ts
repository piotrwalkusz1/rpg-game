import type { Action } from '../../action/model/actions/action';
import { Dialogue, DialogueTranslationKey } from './dialogue';

export type DialogueOptionCondition = () => boolean;

export class DialogueOption {
  readonly prompt: DialogueTranslationKey;
  readonly dialogueProvider: () => Dialogue | undefined;
  readonly condition: DialogueOptionCondition;
  readonly actions: Action[];

  constructor({
    prompt,
    dialogue,
    condition,
    actions
  }: {
    prompt: DialogueTranslationKey;
    dialogue?: Dialogue | (() => Dialogue | undefined);
    condition?: DialogueOptionCondition;
    actions?: Action[];
  }) {
    this.prompt = prompt;
    this.dialogueProvider = dialogue === undefined || dialogue instanceof Dialogue ? () => dialogue : dialogue;
    this.condition = condition || (() => true);
    this.actions = actions || [];
  }
}
