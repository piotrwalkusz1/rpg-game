import type { Character } from '../../../character/model/character';
import type { TerrainObject } from '../model/terrain-object';

export const getMostImportantCharacterActivelyGuardingTerrainObject = (terrainObject: TerrainObject): Character | undefined => {
  return terrainObject.guards.filter((guard) => guard.isNearTerrainObject(terrainObject))[0];
};
