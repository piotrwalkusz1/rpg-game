import { Dialogue, DialogueTranslationKey } from './dialogue';

export type DialogueOptionCondition = () => boolean;

export class DialogueOption {
  readonly prompt: DialogueTranslationKey;
  readonly dialogueProvider: () => Dialogue | undefined;
  readonly condition: DialogueOptionCondition;

  constructor(prompt: DialogueTranslationKey, dialogue?: Dialogue | (() => Dialogue | undefined), condition?: DialogueOptionCondition) {
    this.prompt = prompt;
    this.dialogueProvider = dialogue === undefined || dialogue instanceof Dialogue ? () => dialogue : dialogue;
    this.condition = condition || (() => true);
  }
}
