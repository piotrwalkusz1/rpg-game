import type { Dialogue, DialogueTranslationKey } from './dialogue';

export class DialogueOption {
  constructor(readonly prompt: DialogueTranslationKey, readonly dialogue?: Dialogue) {}
}
