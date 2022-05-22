import type { Character } from 'engine/modules/character';
import type { DialogSpeech } from './dialog-speech';

export class Dialog {
  readonly character: Character;
  readonly speeches: DialogSpeech[];

  constructor({ character, speeches }: { character: Character; speeches: DialogSpeech[] }) {
    this.character = character;
    this.speeches = speeches;
  }
}
