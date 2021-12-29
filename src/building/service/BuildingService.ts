import { Character } from '../../character/model/Character';
import { TerrainObject } from '../../map/terrain-object/TerrainObject';

export const getMostImportantCharacterActivelyGuardingBuilding = (building: TerrainObject): Character | undefined => {
  return building.guards.filter((guard) => guard.field === building.field)[0];
};
