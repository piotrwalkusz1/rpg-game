import type { CDIContainer } from 'cdi-container';
import { GameService } from 'frontend/game';
import type { GameStore } from 'frontend/store/game-store';
import { refreshEngine } from 'frontend/store/game-store-utils';
import { get } from 'svelte/store';
import { Narration } from './narration';
import { CharacterNarrationContext } from './narration-contexts/character-narration-context';
import { FieldNarrationContext } from './narration-contexts/field-narration-context';
import type { NarrationOption } from './narration-option';
import type { NarrationProvider, NarrationProviderParams } from './narration-provider';

export class NarrationService {
  constructor(private narrationProviders: NarrationProvider[], private cdiContainer: CDIContainer) {}

  getNarration = (params: NarrationProviderParams): Narration => {
    if (params.context instanceof FieldNarrationContext) {
      return new Narration({
        title: params.context.field.name,
        description: params.context.field.description,
        image: params.context.field.image,
        options: this.getNarrationOptions(params)
      });
    } else if (params.context instanceof CharacterNarrationContext) {
      return new Narration({
        title: params.context.character.name,
        image: params.context.character.avatar,
        options: this.getNarrationOptions(params)
      });
    }
    throw new Error('Unsupported narrationContext: ' + params.context.constructor.name);
  };

  getNarrationOptions = (params: NarrationProviderParams): NarrationOption[] => {
    return this.narrationProviders.flatMap((narrationProvider) => narrationProvider.getNarrationOptions(params));
  };

  executeOnNarrationOptionClick = (narrationOption: NarrationOption, store: GameStore): Promise<void> => {
    return narrationOption.onClick({
      engine: get(store.engine),
      processEvents: () => GameService.processEvents(get(store.engine), () => refreshEngine(store)),
      setNarrationContext: (narrationContext) => store.narrationContext.set(narrationContext),
      cdiContainer: this.cdiContainer
    });
  };
}
