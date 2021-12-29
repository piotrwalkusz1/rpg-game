import { MapBuilding } from '../../map/model/MapBuilding';
import { Character } from '../../character/model/Character';

export const getMostImportantCharacterActivelyGuardingBuilding = (buildingOnMap: MapBuilding): Character | undefined => {
  return buildingOnMap.guards.filter((guard) => guard.field === buildingOnMap.field)[0];
};
