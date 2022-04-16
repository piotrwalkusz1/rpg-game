import { ArrayUtils } from '../../../../../utils/array-utils';
import { VisionService } from '../../../../modules/vision/service/vision-service';
import type { GameState } from '../../../game/model/game-state';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/model/terrain-object';
import { ChangeTerrainObjectPlacementNarrationAction } from '../../model/narration-actions/change-terrain-object-placement-narration-action';
import { GoToTerrainObjectNarrationAction } from '../../model/narration-actions/go-to-terrain-object-narration-action';
import { LeaveTerrainObjectNarrationAction } from '../../model/narration-actions/leave-terrain-object-narration-action';
import type { TemplateNarrationAction } from '../../model/narration-actions/template-narration-action';
import type { NarrationProvider } from '../../model/narration-provider/narration-provider';
import type { NarrationProviderResult } from '../../model/narration-provider/narration-provider-result';

export namespace TerrainObjectNarrationProvider {
  export const create =
    (terrainObject: TerrainObject): NarrationProvider =>
    ({ trigger, gameState }): NarrationProviderResult | undefined => {
      if (trigger.type !== 'SELECTED_FIELD' || !trigger.field.terrainObjects.getArray().includes(terrainObject)) {
        return;
      }
      return {
        actions: ArrayUtils.filterNotNull([
          getGoAction(terrainObject, gameState),
          getLeaveAction(terrainObject, gameState),
          ...getChangeTerrainObjectPlacementActions(terrainObject, gameState)
        ])
      };
    };

  const getGoAction = (terrainObject: TerrainObject, gameState: GameState): TemplateNarrationAction | undefined => {
    if (!gameState.player.isNearTerrainObject(terrainObject) && VisionService.isLocatable(terrainObject, gameState.player)) {
      return new GoToTerrainObjectNarrationAction(terrainObject);
    }
  };

  const getLeaveAction = (terrainObject: TerrainObject, gameState: GameState): TemplateNarrationAction | undefined => {
    if (gameState.player.isNearTerrainObject(terrainObject)) {
      return new LeaveTerrainObjectNarrationAction(terrainObject);
    }
  };

  const getChangeTerrainObjectPlacementActions = (terrainObject: TerrainObject, gameState: GameState): TemplateNarrationAction[] => {
    if (!gameState.player.isNearTerrainObject(terrainObject)) {
      return [];
    }
    const playerTerrrainPositionPlacement =
      gameState.player.position instanceof TerrainObjectPosition && gameState.player.position.placement;
    return terrainObject.type.placements
      .filter((placement) => placement !== playerTerrrainPositionPlacement)
      .map((placement) => new ChangeTerrainObjectPlacementNarrationAction(terrainObject, placement));
  };
}
