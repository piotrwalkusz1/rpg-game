import { Character } from '../../character/model/Character';
import { Building } from '../model/Building';

export const getMostImportantCharacterActivelyGuardingBuilding = (building: Building): Character | undefined => {
  return building.guards.filter((guard) => guard.field === building.field)[0];
};
