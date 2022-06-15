import type { GameStore } from 'frontend/store/game-store';
import { typeName } from 'utils';
import { Narration } from './narration';
import { CharacterNarrationContext } from './narration-contexts/character-narration-context';
import { FieldNarrationContext } from './narration-contexts/field-narration-context';
import type { NarrationOption } from './narration-option';
import type { NarrationOptionExecutor } from './narration-option-executor';
import type { NarrationProvider, NarrationProviderParams } from './narration-provider';

export class NarrationService {
  constructor(
    private narrationProviders: NarrationProvider[],
    private narrationOptionExecutors: NarrationOptionExecutor<NarrationOption>[]
  ) {}

  getNarration(params: NarrationProviderParams): Narration {
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
  }

  getNarrationOptions(params: NarrationProviderParams): NarrationOption[] {
    return this.narrationProviders.flatMap((narrationProvider) => narrationProvider.getNarrationOptions(params));
  }

  executeNarrationOption(narrationOption: NarrationOption, store: GameStore): Promise<void> {
    const executor = this.narrationOptionExecutors.filter((executor) => narrationOption instanceof executor.narrationOptionType)[0];
    if (!executor) {
      throw new Error('NarrationOptionExecutor for type ' + typeName(narrationOption) + ' not found');
    }
    return executor.execute(narrationOption, store);
  }
}
