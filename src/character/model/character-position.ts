import type { MapField } from '../../map/model/map-field';
import { TerrainObjectPlacement } from '../../map/terrain-object/model/terrain-object-placement';
import type { TerrainObjectPlacementType } from '../../map/terrain-object/model/terrain-object-placement-type';

export class CharacterPosition {
  readonly field: MapField;
  readonly terrainObjectPlacement?: TerrainObjectPlacement;

  constructor({
    field,
    terrainObjectPlacement,
    terrainObjectPlacementType
  }: {
    field: MapField;
    terrainObjectPlacement?: TerrainObjectPlacement;
    terrainObjectPlacementType?: TerrainObjectPlacementType;
  }) {
    if (terrainObjectPlacement) {
      if (terrainObjectPlacementType && terrainObjectPlacementType !== terrainObjectPlacement.type) {
        throw new Error('"terrainObjectPlacementType" and "terrainObjectPlacement.type" must be equal');
      }
      terrainObjectPlacementType = terrainObjectPlacement.type;
    }
    if (terrainObjectPlacementType) {
      if (!field.terrainObjectType) {
        throw new Error(`Cannot set placement ${terrainObjectPlacementType.id} on field without terrain object`);
      }
      if (!field.terrainObjectType.placements.includes(terrainObjectPlacementType)) {
        throw new Error(
          `Terrain object placement ${terrainObjectPlacementType.id} is not allowed on field with terrain object ${field.terrainObjectType.id}`
        );
      }
    }

    terrainObjectPlacementType = terrainObjectPlacementType || field.terrainObjectType?.defaultCharacterPlacement;

    this.field = field;
    this.terrainObjectPlacement =
      terrainObjectPlacement || (terrainObjectPlacementType && new TerrainObjectPlacement(terrainObjectPlacementType));
  }

  withTerrainObjectPlacement(terrainObjectPlacement?: TerrainObjectPlacement): CharacterPosition {
    return new CharacterPosition({ field: this.field, terrainObjectPlacement: terrainObjectPlacement });
  }

  withTerrainObjectPlacementType(terrainObjectPlacementType?: TerrainObjectPlacementType): CharacterPosition {
    return new CharacterPosition({ field: this.field, terrainObjectPlacementType: terrainObjectPlacementType });
  }
}
