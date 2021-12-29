import { TerrainObjectPlacement } from '../../map/terrain-object/TerrainObjectPlacement';
import { TerrainObjectPlacementType } from '../../map/terrain-object/TerrainObjectPlacementType';
import { MapField } from '../../map/model/MapField';

export class CharacterPosition {
  readonly field: MapField;
  readonly placementOnFieldWithBuilding?: TerrainObjectPlacement;

  constructor({
    field,
    placementOnFieldWithBuilding,
    placementOnFieldWithBuildingType
  }: {
    field: MapField;
    placementOnFieldWithBuilding?: TerrainObjectPlacement;
    placementOnFieldWithBuildingType?: TerrainObjectPlacementType;
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
      if (!field.buildingType.placements.includes(placementOnFieldWithBuildingType)) {
        throw new Error(
          `Character placement ${placementOnFieldWithBuildingType.id} is not allowed on field with building ${field.buildingType.id}`
        );
      }
    }

    placementOnFieldWithBuildingType = placementOnFieldWithBuildingType || field.buildingType?.defaultCharacterPlacement;

    this.field = field;
    this.placementOnFieldWithBuilding =
      placementOnFieldWithBuilding || (placementOnFieldWithBuildingType && new TerrainObjectPlacement(placementOnFieldWithBuildingType));
  }

  withPlacementOnFieldWithBuilding(placementOnFieldWithBuilding?: TerrainObjectPlacement): CharacterPosition {
    return new CharacterPosition({ field: this.field, placementOnFieldWithBuilding });
  }

  withPlacementOnFieldWithBuildingType(placementOnFieldWithBuildingType?: TerrainObjectPlacementType): CharacterPosition {
    return new CharacterPosition({ field: this.field, placementOnFieldWithBuildingType });
  }
}
