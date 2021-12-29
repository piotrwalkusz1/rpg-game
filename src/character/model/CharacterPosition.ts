import { CharacterPlacementOnFieldWithBuilding } from '../../building/model/CharacterPlacementOnFieldWithBuilding';
import { CharacterPlacementOnFieldWithBuildingType } from '../../building/model/CharacterPlacementOnFieldWithBuildingType';
import { MapField } from '../../map/model/MapField';

export class CharacterPosition {
  readonly field: MapField;
  readonly placementOnFieldWithBuilding?: CharacterPlacementOnFieldWithBuilding;

  constructor({
    field,
    placementOnFieldWithBuilding,
    placementOnFieldWithBuildingType
  }: {
    field: MapField;
    placementOnFieldWithBuilding?: CharacterPlacementOnFieldWithBuilding;
    placementOnFieldWithBuildingType?: CharacterPlacementOnFieldWithBuildingType;
  }) {
    if (placementOnFieldWithBuilding) {
      if (placementOnFieldWithBuildingType && placementOnFieldWithBuildingType !== placementOnFieldWithBuilding.type) {
        throw new Error('"placementOnFieldWithBuildingType" and "placementOnFieldWithBuilding.type" must be equal');
      }
      placementOnFieldWithBuildingType = placementOnFieldWithBuilding.type;
    }
    if (placementOnFieldWithBuildingType) {
      if (!field.buildingType) {
        throw new Error(`Cannot set character placement ${placementOnFieldWithBuildingType.id} on field without buliding`);
      }
      if (!field.buildingType.allowedCharacterPlacements.includes(placementOnFieldWithBuildingType)) {
        throw new Error(
          `Character placement ${placementOnFieldWithBuildingType.id} is not allowed on field with building ${field.buildingType.id}`
        );
      }
    }

    placementOnFieldWithBuildingType = placementOnFieldWithBuildingType || field.buildingType?.defaultCharacterPlacement;

    this.field = field;
    this.placementOnFieldWithBuilding =
      placementOnFieldWithBuilding ||
      (placementOnFieldWithBuildingType && new CharacterPlacementOnFieldWithBuilding(placementOnFieldWithBuildingType));
  }

  withPlacementOnFieldWithBuilding(placementOnFieldWithBuilding?: CharacterPlacementOnFieldWithBuilding): CharacterPosition {
    return new CharacterPosition({ field: this.field, placementOnFieldWithBuilding });
  }

  withPlacementOnFieldWithBuildingType(placementOnFieldWithBuildingType?: CharacterPlacementOnFieldWithBuildingType): CharacterPosition {
    return new CharacterPosition({ field: this.field, placementOnFieldWithBuildingType });
  }
}
