import { OfferInteraction } from 'engine/modules/offer';
import { TalkOffer } from 'engine/modules/talk/talk-offer';
import { getPlayer } from 'game';
import { CharacterNarrationContext } from '../narration-contexts/character-narration-context';
import type { NarrationOption } from '../narration-option';
import { InteractionNarrationOption } from '../narration-options/interaction-narration-option';
import { NarrationProvider, NarrationProviderParams } from '../narration-provider';

export class TalkNarrationProvider extends NarrationProvider {
  override getNarrationOptions(params: NarrationProviderParams): NarrationOption[] {
    if (!(params.context instanceof CharacterNarrationContext)) {
      return [];
    }

    return [
      new InteractionNarrationOption({
        name: 'INTERACTION.TALK.NAME',
        image: '/images/ui/speech-bubble.png',
        interaction: new OfferInteraction(new TalkOffer(getPlayer(params.engine).talker, params.context.character.talker))
      })
    ];
  }
}
