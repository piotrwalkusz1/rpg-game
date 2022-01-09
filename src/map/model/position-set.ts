import type { TerrainObject } from '../terrain-object/model/terrain-object';
import type { TerrainObjectPlacement } from '../terrain-object/model/terrain-object-placement';
import type { MapField } from './map-field';

export type PositionSet =
  | {
      type: 'complex';
      subSets: PositionSet[];
    }
  | {
      type: 'field';
      field: MapField;
    }
  | {
      type: 'terrainObject';
      terrainObject: TerrainObject;
    }
  | {
      type: 'terrainObjectPlacement';
      terrainObject: TerrainObject;
      placement: TerrainObjectPlacement;
    }
  | {
      type: 'empty';
    };

export namespace PositionSet {
  export const create = (
    args?: { field: MapField } | { terrainObject: TerrainObject; placement?: TerrainObjectPlacement } | { subSets: PositionSet[] }
  ): PositionSet => {
    if (!args) {
      return { type: 'empty' };
    }
    if ('subSets' in args) {
      return { type: 'complex', subSets: args.subSets };
    }
    if ('field' in args) {
      return { type: 'field', field: args.field };
    }
    if (!args.placement) {
      return { type: 'terrainObject', terrainObject: args.terrainObject };
    }
    return { type: 'terrainObjectPlacement', terrainObject: args.terrainObject, placement: args.placement };
  };
  export const areOverlapping = (firstPositionSet: PositionSet, secondPositionSet: PositionSet): boolean => {

    if (firstPositionSet.type === 'empty' || secondPositionSet.type === 'empty') {
      return false;
    }
    if (firstPositionSet.type === 'complex') {
      return firstPositionSet.subSets.some((subSet) => areOverlapping(subSet, secondPositionSet));
    }
    if (secondPositionSet.type === 'complex') {
      return secondPositionSet.subSets.some((subSet) => areOverlapping(subSet, firstPositionSet));
    }
    if (firstPositionSet.type === 'field') {
      if (secondPositionSet.type === 'field') {
        return firstPositionSet.field === secondPositionSet.field;
      } else {
        return firstPositionSet.field === secondPositionSet.terrainObject.field;
      }
    } else if (firstPositionSet.type === 'terrainObject') {
      if (secondPositionSet.type === 'field') {
        return firstPositionSet.terrainObject.field === secondPositionSet.field;
      } else {
        return firstPositionSet.terrainObject === secondPositionSet.terrainObject;
      }
    } else {
      if (secondPositionSet.type === 'field') {
        return firstPositionSet.terrainObject.field === secondPositionSet.field;
      } else if (secondPositionSet.type === 'terrainObject') {
        return firstPositionSet.terrainObject === secondPositionSet.terrainObject;
      } else {
        return (
          firstPositionSet.terrainObject === secondPositionSet.terrainObject && firstPositionSet.placement === secondPositionSet.placement
        );
      }
    }
  };
}
