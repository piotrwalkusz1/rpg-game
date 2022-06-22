import { CharacterNarrationContext } from '../narration-contexts';
import type { NarrationOption } from '../narration-option';
import { NarrationProvider, NarrationProviderParams } from '../narration-provider';
import { NarrationProviderContainer } from '../narration-provider-container';

export class CustomChracterNarrationProvider extends NarrationProvider {
  override getNarrationOptions(params: NarrationProviderParams): NarrationOption[] {
    if (params.context instanceof CharacterNarrationContext) {
      return params.context.character.getComponent(NarrationProviderContainer)?.getNarrationOptions(params) || [];
    }
    return [];
  }
}
