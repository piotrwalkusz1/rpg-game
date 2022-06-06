import { TalkOfferInteraction } from 'engine/modules/talk/talk-offer-interaction';
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
        interaction: new TalkOfferInteraction({ interlocutor: params.context.character })
      })
    ];
  }
}
