import { ArrayUtils } from '../../../common/array-utils';
import type { WorldState } from '../../../game/model/world-state';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { VisionService } from '../../../trait/vision/service/vision-service';
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
          getGoAction(terrainObject, gameState.worldState),
          getLeaveAction(terrainObject, gameState.worldState),
          ...getChangeTerrainObjectPlacementActions(terrainObject, gameState.worldState)
        ])
      };
    };

  const getGoAction = (terrainObject: TerrainObject, worldState: WorldState): TemplateNarrationAction | undefined => {
    if (
      !worldState.player.character.isNearTerrainObject(terrainObject) &&
      VisionService.isLocatable(terrainObject, worldState.player.character)
    ) {
      return new GoToTerrainObjectNarrationAction(terrainObject);
    }
  };

  const getLeaveAction = (terrainObject: TerrainObject, worldState: WorldState): TemplateNarrationAction | undefined => {
    if (worldState.player.character.isNearTerrainObject(terrainObject)) {
      return new LeaveTerrainObjectNarrationAction(terrainObject);
    }
  };

  const getChangeTerrainObjectPlacementActions = (terrainObject: TerrainObject, worldState: WorldState): TemplateNarrationAction[] => {
    if (!worldState.player.character.isNearTerrainObject(terrainObject)) {
      return [];
    }
    const playerTerrrainPositionPlacement =
      worldState.player.character.position instanceof TerrainObjectPosition && worldState.player.character.position.placement;
    return terrainObject.type.placements
      .filter((placement) => placement !== playerTerrrainPositionPlacement)
      .map((placement) => new ChangeTerrainObjectPlacementNarrationAction(terrainObject, placement));
  };
}
