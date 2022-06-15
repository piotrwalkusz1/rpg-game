import type { Talker } from 'engine/modules/talk/talker';
import { NarrationOption } from '../narration-option';

export class TalkNarrationOption extends NarrationOption {
  readonly talker: Talker;

  constructor({ talker }: { talker: Talker }) {
    super({ name: 'INTERACTION.TALK.NAME', image: '/images/ui/speech-bubble.png' });
    this.talker = talker;
  }
}
