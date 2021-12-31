import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapField } from '../../../map/model/map-field';
import { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { getMostImportantCharacterActivelyGuardingTerrainObject } from '../../../map/terrain-object/service/terrain-object-service';

import { Action } from '../../model/action';
import { ActionContextDescription } from '../../model/action-conctext-description';
import { ActionContext } from '../../model/action-context';
import type { ActionTrigger } from '../../model/action-trigger';
import { MapFieldActionTrigger } from '../../model/map-field-action-trigger';
import { ActionContextProvider } from './action-context-provider';

interface Data {
  field: MapField;
  terrainObject: TerrainObject;
}

export class TerrainObjectActionContextProvider extends ActionContextProvider<Data> {
  override getDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): Data | undefined {
    const field = actionTrigger instanceof MapFieldActionTrigger && actionTrigger.field;
    const terrainObject = field && field.terrainObject instanceof TerrainObject && field.terrainObject;
    if (terrainObject) {
      return {
        field,
        terrainObject
      };
    }
    return undefined;
  }

  override getTitle({ terrainObject: building }: Data): { title: TranslatableText; order: number } {
    return { title: building.type.name, order: 100 };
  }

  override getDescription(
    { field, terrainObject: building }: Data,
    gameState: GameState
  ): Array<{ description: TranslatableText; order: number }> {
    const descriptions = [{ description: building.type.description, order: 100 }];
    field.characters
      .filter((character) => character !== gameState.player.character)
      .forEach((character) => {
        const descriptionOfCharacter = character.position?.terrainObjectPlacement!.type.getCharacterDescription(character);
        if (descriptionOfCharacter) {
          descriptions.push({ description: descriptionOfCharacter, order: 50 });
        }
      });
    return descriptions;
  }

  override getActions({ field, terrainObject: building }: Data, gameState: GameState): Array<Action> {
    if (gameState.player.character.field !== field) {
      return [];
    }
    return [
      new Action({
        id: 'ENTER_BUILDING',
        order: 200,
        executeAction: (actionExecutionContext) => {
          const guard = getMostImportantCharacterActivelyGuardingTerrainObject(building);
          if (guard) {
            const newActionContext = new ActionContext(
              building.type.name,
              new ActionContextDescription({ translationKey: 'ACTION.ACTION_TYPE.ENTER_BUILDING.DIALOGUE_001_YOU_CANNOT_ENTER' }, guard),
              false,
              []
            );
            actionExecutionContext.changeActionContext(newActionContext);
          } else {
            const newActionContext = new ActionContext(
              building.type.name,
              new ActionContextDescription(building.type.description),
              false,
              []
            );
            actionExecutionContext.changeActionContext(newActionContext);
          }
        }
      })
    ];
  }
}
