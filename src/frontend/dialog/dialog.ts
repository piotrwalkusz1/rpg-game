import type { Character } from 'engine/modules/character';
import type { DialogSpeech } from './dialog-speech';

export class Dialog {
  readonly character: Character;
  readonly speeches: DialogSpeech[];
  readonly onClose?: () => void;

  constructor({ character, speeches, onClose }: { character: Character; speeches: DialogSpeech[]; onClose?: () => void }) {
    this.character = character;
    this.speeches = speeches;
    this.onClose = onClose;
  }
}
