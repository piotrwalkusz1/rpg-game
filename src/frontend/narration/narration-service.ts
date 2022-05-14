import { Narration } from './narration';
import { CharacterNarrationContext } from './narration-contexts/character-narration-context';
import { FieldNarrationContext } from './narration-contexts/field-narration-context';
import type { NarrationOption } from './narration-option';
import type { NarrationProvider, NarrationProviderParams } from './narration-provider';
import { CharacterNarrationProvider } from './narration-providers/character-narration-provider';
import { MovementNarrationProvider } from './narration-providers/movement-narration-provider';

export namespace NarrationService {
  const narrationProviders: NarrationProvider[] = [new MovementNarrationProvider(), new CharacterNarrationProvider()];

  export const getNarration = (params: NarrationProviderParams): Narration | undefined => {
    if (params.context instanceof FieldNarrationContext) {
      return new Narration({
        title: params.context.field.name,
        description: params.context.field.description,
        image: params.context.field.image,
        options: getNarrationOptions(params)
      });
    } else if (params.context instanceof CharacterNarrationContext) {
      return new Narration({
        title: params.context.character.name,
        image: params.context.character.avatar,
        options: getNarrationOptions(params)
      });
    }
    return undefined;
  };

  const getNarrationOptions = (params: NarrationProviderParams): NarrationOption[] => {
    return narrationProviders.flatMap((narrationProvider) => narrationProvider.getNarrationOptions(params));
  };
}
