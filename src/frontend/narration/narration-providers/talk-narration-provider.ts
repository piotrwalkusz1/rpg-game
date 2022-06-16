import type { TalkService } from 'engine/modules/talk/talk-service';
import { getPlayer } from 'game';
import { CharacterNarrationContext } from '../narration-contexts/character-narration-context';
import type { NarrationOption } from '../narration-option';
import { TalkNarrationOption } from '../narration-options/talk-narration-option';
import { NarrationProvider, NarrationProviderParams } from '../narration-provider';

export class TalkNarrationProvider extends NarrationProvider {
  constructor(private talkService: TalkService) {
    super();
  }

  override getNarrationOptions({ context, engine }: NarrationProviderParams): NarrationOption[] {
    if (
      !(context instanceof CharacterNarrationContext) ||
      !this.talkService.canOfferTalk(getPlayer(engine).talker, context.character.talker)
    ) {
      return [];
    }
    return [new TalkNarrationOption({ talker: context.character.talker })];
  }
}
