import type { GameState } from '../../game/model/game-state';
import { createTranslatableTextFromArray } from '../../i18n/translatable-text';
import type { MapField } from '../../map/model/map-field';
import { Narration } from '../model/narration';
import type { NarrationActionExecutionContext } from '../model/narration-action-execution-context';
import { NarrationActionExecutionResult } from '../model/narration-action-execution-result';
import type { NarrationAction } from '../model/narration-actions/narration-action';
import { NarrationDescription } from '../model/narration-description';
import { FieldNarrationProvider } from './narration-providers/field-narration-provider';
import type { NarrationProvider, NarrationProviderWithData } from './narration-providers/narration-provider';
import { TerrainObjectNarrationProvider } from './narration-providers/terrain-object-narration-provider';

const narrationProviders: NarrationProvider<any>[] = [new FieldNarrationProvider(), new TerrainObjectNarrationProvider()];

export namespace NarrationService {
  export const getNarrationForField = (field: MapField, gameState: GameState): Narration => {
    const narrationProvidersWithData: NarrationProviderWithData<any>[] = narrationProviders.flatMap((narrationProvider) => {
      const narrationProviderWithData = narrationProvider.getNarrationProviderWithDataIfSupported(field);
      return narrationProviderWithData ? [narrationProviderWithData] : [];
    });
    const titles = narrationProvidersWithData
      .map((narrationProviderWithData) => narrationProviderWithData.getTitle())
      .flatMap((title) => (title ? [title] : []))
      .sort((a, b) => a.order - b.order);
    const title = titles.length > 0 ? titles[0].title : '';
    const descriptions = narrationProvidersWithData
      .flatMap((narrationProviderWithData) => narrationProviderWithData.getDescription(gameState))
      .sort((a, b) => a.order - b.order)
      .map((narrationProviderWithData) => narrationProviderWithData.description);
    const description = createTranslatableTextFromArray(descriptions, ' ');
    const actions = narrationProvidersWithData
      .flatMap((narrationProviderWithData) => narrationProviderWithData.getActions(gameState))
      .sort((a, b) => a.order - b.order);

    return new Narration({ title: title, description: new NarrationDescription(description), actions: actions });
  };

  export const executeNarrationAction = (
    narrationAction: NarrationAction,
    narrationActionExecutionContext: NarrationActionExecutionContext
  ): Narration | undefined => {
    const result = narrationAction.execute(narrationActionExecutionContext);
    switch (result) {
      case NarrationActionExecutionResult.NEXT_NARRATION:
        return narrationAction.getNextNarration();
      case NarrationActionExecutionResult.KEEP_NARRATION:
        return narrationActionExecutionContext.getNarration();
    }
  };
}
