import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import type { ActionTrigger } from '../../model/action-triggers/action-trigger';
import type { Action } from '../../model/actions/action';
import { GoToTerrainObjectAction } from '../../model/actions/go-to-terrain-object';
import { LeaveTerrainAction } from '../../model/actions/leave-terrain-object';
import { FieldSelectedActionTrigger } from '../../model/action-triggers/field-selected-action-trigger';
import { ActionContextProvider } from './action-context-provider';
import { ChangeTerrainObjectPlacementAction } from '../../model/actions/change-terrain-object-placement-action';

interface Data {
  terrainObjects: readonly TerrainObject[];
}

export class TerrainObjectActionContextProvider extends ActionContextProvider<Data> {
  override getDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): Data | undefined {
    const field = actionTrigger instanceof FieldSelectedActionTrigger && actionTrigger.field;
    return field && field.terrainObjects.length > 0 ? { terrainObjects: field.terrainObjects.getArray() } : undefined;
  }

  override getDescription({ terrainObjects }: Data, gameState: GameState): { description: TranslatableText; order: number }[] {
    const terrainObjectWherePlayerIs = terrainObjects.find((terrainObject) =>
      gameState.player.character.isNearTerrainObject(terrainObject)
    );
    if (!terrainObjectWherePlayerIs) {
      return [];
    }
    return terrainObjectWherePlayerIs.characters
      .getArray()
      .filter((character) => character !== gameState.player.character)
      .map(
        (character) =>
          character.position instanceof TerrainObjectPosition && character.position.placement.getCharacterDescription(character)
      )
      .flatMap((description) => (description ? [{ description, order: 100 }] : []));
  }

  override getActions({ terrainObjects }: Data, gameState: GameState): Array<Action> {
    return terrainObjects.flatMap((terrainObject) => this.prepareActionsForTerrainObject(terrainObject, gameState));
  }

  private prepareActionsForTerrainObject(terrainObject: TerrainObject, gameState: GameState): Action[] {
    return [
      this.prepareGoAction(terrainObject, gameState),
      this.prepareLeaveAction(terrainObject, gameState),
      ...this.prepareChangeTerrainObjectPlacementActions(terrainObject, gameState)
    ].flatMap((action) => (action ? [action] : []));
  }

  private prepareGoAction(terrainObject: TerrainObject, gameState: GameState): Action | undefined {
    if (gameState.player.character.isNearTerrainObject(terrainObject)) {
      return;
    }
    return new GoToTerrainObjectAction(terrainObject);
  }

  private prepareLeaveAction(terrainObject: TerrainObject, gameState: GameState): Action | undefined {
    if (!gameState.player.character.isNearTerrainObject(terrainObject)) {
      return;
    }
    return new LeaveTerrainAction(terrainObject);
  }

  private prepareChangeTerrainObjectPlacementActions(terrainObject: TerrainObject, gameState: GameState): Action[] {
    if (!gameState.player.character.isNearTerrainObject(terrainObject)) {
      return [];
    }
    const playerTerrrainPositionPlacement =
      gameState.player.character.position instanceof TerrainObjectPosition && gameState.player.character.position.placement;
    return terrainObject.type.placements
      .filter((placement) => placement !== playerTerrrainPositionPlacement)
      .map((placement) => new ChangeTerrainObjectPlacementAction(terrainObject, placement));
  }
}
