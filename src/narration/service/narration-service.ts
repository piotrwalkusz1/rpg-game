import { ArrayUtils } from '../../common/array-utils';
import type { GameContext } from '../../game/model/game-context';
import type { GameState } from '../../game/model/game-state';
import { createTranslatableTextFromArray } from '../../i18n/translatable-text';
import type { MapField } from '../../map/model/map-field';
import { Narration } from '../model/narration';
import { NarrationAction } from '../model/narration-actions/narration-action';
import { NarrationDescription } from '../model/narration-description';
import type { NarrationProvider } from '../model/narration-provider/narration-provider';
import type { NarrationProviderTrigger } from '../model/narration-provider/narration-provider-trigger';
import type { NarrationSequence } from '../model/narration-sequence/narration-sequence';
import { NarrationSequenceSceneAction } from '../model/narration-sequence/narration-sequence-scene-action';
import type { NarrationSequenceStage } from '../model/narration-sequence/narration-sequence-stage';
import { CharacterNarrationProvider } from './narration-providers/character-narration-provider';
import { FieldNarrationProvider } from './narration-providers/field-narration-provider';
import { LocationNarrationProvider } from './narration-providers/location-narration-provider';
import { TerrainObjectNarrationProvider } from './narration-providers/terrain-object-narration-provider';

export namespace NarrationService {
  export const getNarrationSelectedField = (gameState: GameState): Narration | undefined => {
    return gameState.selectedField && NarrationService.getNarrationForField(gameState.selectedField, gameState);
  };

  export const getNarrationForField = (field: MapField, gameState: GameState): Narration => {
    const trigger: NarrationProviderTrigger = { type: 'SELECTED_FIELD', field };
    const narrationProviders: NarrationProvider[] = [
      FieldNarrationProvider.create(field),
      ...field.narrationProviders,
      ...field.subLocations
        .getArray()
        .flatMap((subLocation) => [LocationNarrationProvider.create(subLocation), ...subLocation.narrationProviders]),
      ...field.characters
        .getArray()
        .flatMap((character) => [CharacterNarrationProvider.create(character), ...character.narrationProviders]),
      ...field.terrainObjects
        .getArray()
        .flatMap((terrainObject) => [
          TerrainObjectNarrationProvider.create(terrainObject),
          ...terrainObject.narrationProviders,
          ...terrainObject.characters
            .getArray()
            .flatMap((character) => [CharacterNarrationProvider.create(character), ...character.narrationProviders])
        ])
    ];
    const narrationProvidersResults = ArrayUtils.filterNotNull(
      narrationProviders.map((narrationProvider) => narrationProvider({ trigger, gameState }))
    );
    const titles = narrationProvidersResults
      .map((narrationProviderResult) => narrationProviderResult.title)
      .flatMap((title) => (title ? [title] : []))
      .sort((firstTitle, secondTitle) => firstTitle.order - secondTitle.order);
    const title = titles.length > 0 ? titles[0].value : undefined;
    const descriptions = narrationProvidersResults
      .flatMap((narrationProviderResult) => (narrationProviderResult.descriptions ? narrationProviderResult.descriptions : []))
      .sort((firstDescription, secondDescription) => firstDescription.order - secondDescription.order)
      .map((description) => description.value);
    const description = createTranslatableTextFromArray(descriptions, ' ');
    const actions = narrationProvidersResults
      .flatMap((narrationProviderResult) => (narrationProviderResult.actions ? narrationProviderResult.actions : []))
      .sort((firstAction, secondAction) => firstAction.order - secondAction.order);

    return new Narration({ title, description: new NarrationDescription(description), actions });
  };

  export const executeNarrationAction = (action: NarrationAction, context: GameContext): Narration | undefined => {
    return executeNarrationSequenceStages(action.narrationSequence, action.narrationStages, context);
  };

  const executeNarrationSequenceStages = (
    narrationSequence: NarrationSequence,
    narrationSequenceStages: NarrationSequenceStage[],
    context: GameContext
  ): Narration | undefined => {
    if (narrationSequenceStages.length === 0) {
      return undefined;
    }
    const [currentStage, ...nextStages] = narrationSequenceStages;
    const result = currentStage.execute({
      gameContext: context,
      narrationSequence
    });
    switch (result.type) {
      case 'NEXT_STAGE':
        return executeNarrationSequenceStages(narrationSequence, result.nextStages || nextStages, context);
      case 'SCENE': {
        const actions = NarrationSequenceSceneAction.getNarrationActions(result.scene.actions || [], nextStages);
        return new Narration({
          title: narrationSequence.title,
          description: result.scene.description,
          actions:
            actions.length > 0
              ? actions
              : [new NarrationAction({ name: 'NARRATION.COMMON.OK', narrationSequence, narrationStages: nextStages })],
          isActionRequired: true
        });
      }
    }
  };
}
