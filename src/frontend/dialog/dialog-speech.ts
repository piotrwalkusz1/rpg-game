import type { Character } from 'engine/modules/character';
import type { TranslatableText } from 'i18n/translatable-text';

export class DialogSpeech {
  readonly character: Character;
  readonly content: TranslatableText;

  constructor({ character, content }: { character: Character; content: TranslatableText }) {
    this.character = character;
    this.content = content;
  }
}
