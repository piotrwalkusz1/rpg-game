import { Narration } from './narration';
import { FieldNarrationContext } from './narration-contexts/field-narration-context';
import type { NarrationOption } from './narration-option';
import type { NarrationProvider, NarrationProviderParams } from './narration-provider';
import { MovementNarrationProvider } from './narration-providers/movement-narration-provider';

export namespace NarrationService {
  const narrationProviders: NarrationProvider[] = [new MovementNarrationProvider()];

  export const getNarration = (params: NarrationProviderParams): Narration | undefined => {
    if (params.context instanceof FieldNarrationContext) {
      return new Narration({
        title: params.context.field.name,
        description: params.context.field.description,
        image: params.context.field.image,
        options: getNarrationOptions(params)
      });
    }
    return undefined;
  };

  const getNarrationOptions = (params: NarrationProviderParams): NarrationOption[] => {
    return narrationProviders.flatMap((narrationProvider) => narrationProvider.getNarrationOptions(params));
  };
}
