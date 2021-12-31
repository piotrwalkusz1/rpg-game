import type { CharactersContainer } from '../../character/model/characters-container';
import type { TerrainObject } from '../terrain-object/model/terrain-object';
import type { TerrainObjectPlacement } from '../terrain-object/model/terrain-object-placement';
import type { MapField } from './map-field';

export abstract class Position {
  static areEqual(firstPosition: Position | undefined, secondPosition: Position | undefined) {
    if (firstPosition === undefined && secondPosition === undefined) {
      return true;
    } else if (firstPosition === undefined || secondPosition === undefined) {
      return false;
    } else {
      return firstPosition.equals(secondPosition);
    }
  }

  abstract get field(): MapField | undefined;

  abstract get characters(): CharactersContainer;

  abstract equals(position: Position): boolean;

  abstract isNearTerrainObject(terrainObject: TerrainObject): boolean;

  isOnField(field: MapField): boolean {
    return this.field?.isOnField(field) || false;
  }
}

export class FieldPosition extends Position {
  constructor(private readonly _field: MapField) {
    super();
  }

  override get field(): MapField {
    return this._field;
  }

  override get characters(): CharactersContainer {
    return this._field.characters;
  }

  override equals(position: Position): boolean {
    return position === this || (position instanceof FieldPosition && position._field === this._field);
  }

  override isNearTerrainObject(): boolean {
    return false;
  }
}

export class TerrainObjectPosition extends Position {
  constructor(
    readonly terrainObject: TerrainObject,
    readonly placement: TerrainObjectPlacement = terrainObject.type.defaultCharacterPlacement
  ) {
    super();
  }

  override get field(): MapField | undefined {
    return this.terrainObject.field;
  }

  override get characters(): CharactersContainer {
    return this.terrainObject.characters;
  }

  override equals(position: Position): boolean {
    return (
      position === this ||
      (position instanceof TerrainObjectPosition && position.terrainObject === this.terrainObject && position.placement === this.placement)
    );
  }

  override isNearTerrainObject(terrainObject: TerrainObject): boolean {
    return this.terrainObject === terrainObject;
  }
}
