import type { GameState } from '../../../game/model/game-state';
import { TerrainObjectPosition, FieldPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { Action } from '../../model/action';
import type { ActionTrigger } from '../../model/action-trigger';
import { FieldSelectedActionTrigger } from '../../model/map-field-action-trigger';
import { ActionContextProvider } from './action-context-provider';
import { MapField } from '../../../map/model/map-field';

interface Data {
  terrainObjects: readonly TerrainObject[];
  field: MapField;
}

export class TerrainObjectActionContextProvider extends ActionContextProvider<Data> {
  override getDataFromActionTriggerIfSupported(actionTrigger: ActionTrigger): Data | undefined {
    const field = actionTrigger instanceof FieldSelectedActionTrigger && actionTrigger.field;
    return field && field.terrainObjects.length > 0 ? { terrainObjects: field.terrainObjects.getArray(), field: field } : undefined;
  }

  override getActions({ terrainObjects, field }: Data, gameState: GameState): Array<Action> {
    return terrainObjects.flatMap((terrainObject) => this.prepareActionsForTerrainObject(terrainObject, field, gameState));
  }

  private prepareActionsForTerrainObject(terrainObject: TerrainObject, field: MapField, gameState: GameState): Action[] {
    return [this.prepareGoAction(terrainObject, gameState), this.prepareLeaveAction(terrainObject, field, gameState)].flatMap((action) =>
      action ? [action] : []
    );
  }

  private prepareGoAction(terrainObject: TerrainObject, gameState: GameState): Action | undefined {
    if (gameState.player.character.isNearTerrainObject(terrainObject)) {
      return;
    }
    return new Action({
      id: 'GO',
      nameContext: terrainObject.name,
      order: 100,
      executeAction: (actionExecutionContext) => {
        actionExecutionContext.go(new TerrainObjectPosition(terrainObject));
        return undefined;
      }
    });
  }

  private prepareLeaveAction(terrainObject: TerrainObject, field: MapField, gameState: GameState): Action | undefined {
    if (!gameState.player.character.isNearTerrainObject(terrainObject)) {
      return;
    }
    return new Action({
      id: 'LEAVE',
      nameContext: terrainObject.name,
      order: 100,
      executeAction: (actionExecutionContext) => {
        actionExecutionContext.go(new FieldPosition(field));
        return undefined;
      }
    });
  }
}
