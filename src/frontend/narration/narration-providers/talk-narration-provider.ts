import { CharacterNarrationContext } from '../narration-contexts/character-narration-context';
import type { NarrationOption } from '../narration-option';
import { TalkNarrationOption } from '../narration-options/talk-narration-option';
import { NarrationProvider, NarrationProviderParams } from '../narration-provider';

export class TalkNarrationProvider extends NarrationProvider {
  override getNarrationOptions(params: NarrationProviderParams): NarrationOption[] {
    if (!(params.context instanceof CharacterNarrationContext)) {
      return [];
    }
    return [new TalkNarrationOption({ talker: params.context.character.talker })];
  }
}
