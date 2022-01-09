import type { GameState } from '../../game/model/game-state';
import { createTranslatableTextFromArray } from '../../i18n/translatable-text';
import type { MapField } from '../../map/model/map-field';
import { Narration } from '../model/narration';
import { NarrationDescription } from '../model/narration-description';
import { FieldNarrationProvider } from './narration-providers/field-narration-provider';
import type { NarrationProvider, NarrationProviderWithData } from './narration-providers/narration-provider';
import { TerrainObjectNarrationProvider } from './narration-providers/terrain-object-narration-provider';

const narrationProviders: NarrationProvider<unknown>[] = [new FieldNarrationProvider(), new TerrainObjectNarrationProvider()];

export namespace NarrationService {
  export const getNarrationForField = (field: MapField, gameState: GameState): Narration => {
    const narrationProvidersWithData: NarrationProviderWithData<unknown>[] = narrationProviders.flatMap((narrationProvider) => {
      const narrationProviderWithData = narrationProvider.getNarrationProviderWithDataIfSupported(field);
      return narrationProviderWithData ? [narrationProviderWithData] : [];
    });
    const titles = narrationProvidersWithData
      .map((narrationProviderWithData) => narrationProviderWithData.getTitle())
      .flatMap((title) => (title ? [title] : []))
      .sort((a, b) => a.order - b.order);
    const title = titles.length > 0 ? titles[0].title : undefined;
    const descriptions = narrationProvidersWithData
      .flatMap((narrationProviderWithData) => narrationProviderWithData.getDescription(gameState))
      .sort((a, b) => a.order - b.order)
      .map((narrationProviderWithData) => narrationProviderWithData.description);
    const description = createTranslatableTextFromArray(descriptions, ' ');
    const actions = narrationProvidersWithData
      .flatMap((narrationProviderWithData) => narrationProviderWithData.getActions(gameState))
      .sort((a, b) => a.order - b.order);

    return new Narration({ title, description: new NarrationDescription(description), actions });
  };

  export const getNarrationSelectedField = (gameState: GameState): Narration | undefined => {
    return gameState.selectedField && NarrationService.getNarrationForField(gameState.selectedField, gameState);
  };
}
