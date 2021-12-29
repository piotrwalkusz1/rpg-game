import { getMostImportantCharacterActivelyGuardingBuilding } from '../../../building/service/BuildingService';
import { TranslatableRichText } from '../../../common/model/TranslatableRichText';
import { GameState } from '../../../game/model/GameState';
import { MapField } from '../../../map/model/MapField';
import { TerrainObject } from '../../../map/terrain-object/TerrainObject';
import { Action } from '../../model/Action';
import { ActionContextDescription } from '../../model/ActionConctextDescription';
import { ActionContext } from '../../model/ActionContext';
import { ActionTrigger } from '../../model/ActionTrigger';
import { MapFieldActionTrigger } from '../../model/MapFieldActionTrigger';
import { ActionContextProvider } from './ActionContextProvider';

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

  override getTitle({ terrainObject: building }: Data): { title: TranslatableRichText; order: number } {
    return { title: building.type.name, order: 100 };
  }

  override getDescription(
    { field, terrainObject: building }: Data,
    gameState: GameState
  ): Array<{ description: TranslatableRichText; order: number }> {
    const descriptions = [{ description: building.type.description, order: 100 }];
    field.characters
      .filter((character) => character !== gameState.player.character)
      .forEach((character) => {
        const descriptionOfCharacter = character.position?.placementOnFieldWithBuilding!.type.getCharacterDescription(character);
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
      new Action('ENTER_BUILDING', 200, (actionExecutionContext) => {
        const guard = getMostImportantCharacterActivelyGuardingBuilding(building);
        if (guard) {
          const newActionContext = new ActionContext(
            building.type.name,
            new ActionContextDescription(
              TranslatableRichText.fromTranslationKey('ACTION.ACTION_TYPE.ENTER_BUILDING.DIALOGUE_001_YOU_CANNOT_ENTER'),
              guard
            ),
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
      })
    ];
  }
}
