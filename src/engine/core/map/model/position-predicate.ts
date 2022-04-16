import type { MapField } from './map-field';
import { FieldPosition, Position, TerrainObjectPosition } from './position';
import type { TerrainObject } from './terrain-object';
import type { TerrainObjectPlacement } from './terrain-object-placement';

export type CreatePositionPredicateArgs =
  | { field: MapField }
  | {
      terrainObject: TerrainObject;
      terrainObjectPlacement?: TerrainObjectPlacement;
    }
  | {
      terrainObject: TerrainObject;
      terrainObjectPlacementOtherThanDefault: true;
    };

export type PositionPredicate = (position: Position) => boolean;

export const createPositionPredicate = (args: CreatePositionPredicateArgs): PositionPredicate => {
  if ('terrainObject' in args) {
    if ('terrainObjectPlacementOtherThanDefault' in args) {
      return (position) =>
        position instanceof TerrainObjectPosition &&
        position.terrainObject === args.terrainObject &&
        position.placement !== args.terrainObject.type.defaultCharacterPlacement;
    } else {
      return (position) =>
        position instanceof TerrainObjectPosition &&
        position.terrainObject === args.terrainObject &&
        (!args.terrainObjectPlacement || position.placement === args.terrainObjectPlacement);
    }
  } else {
    return (position) => position instanceof FieldPosition && position.field === args.field;
  }
};
