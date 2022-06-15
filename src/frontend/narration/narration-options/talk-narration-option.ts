import { TalkService } from 'engine/modules/talk/talk-service';
import type { Talker } from 'engine/modules/talk/talker';
import { getPlayer } from 'game';
import { NarrationOption, NarrationOptionParams } from '../narration-option';

export class TalkNarrationOption extends NarrationOption {
  private talker: Talker;

  constructor({ talker }: { talker: Talker }) {
    super({ name: 'INTERACTION.TALK.NAME', image: '/images/ui/speech-bubble.png' });
    this.talker = talker;
  }

  override async onClick({ engine, processEvents, cdiContainer }: NarrationOptionParams): Promise<void> {
    cdiContainer.get(TalkService).offerTalk(getPlayer(engine).talker, this.talker, engine);
    await processEvents();
  }
}
