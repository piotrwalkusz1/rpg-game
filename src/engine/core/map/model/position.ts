import type { CharactersCollection } from '../../character/model/character';
import type { DetectorContext } from '../../detector/model/detector-context';
import type { MapField } from './map-field';
import type { TerrainObject } from './terrain-object';
import type { TerrainObjectPlacement } from './terrain-object-placement';

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

  abstract get characters(): CharactersCollection;

  abstract equals(position: Position): boolean;

  abstract isNearTerrainObject(terrainObject: TerrainObject): boolean;

  isOnField(field: MapField): boolean {
    return this.field?.isOnField(field) || false;
  }

  abstract get detectorContexts(): DetectorContext[];
}

export class FieldPosition extends Position {
  constructor(private readonly _field: MapField) {
    super();
  }

  override get field(): MapField {
    return this._field;
  }

  override get characters(): CharactersCollection {
    return this._field.characters;
  }

  override equals(position: Position): boolean {
    return position === this || (position instanceof FieldPosition && position._field === this._field);
  }

  override isNearTerrainObject(): boolean {
    return false;
  }

  override get detectorContexts(): DetectorContext[] {
    return [this._field];
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

  override get characters(): CharactersCollection {
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

  override get detectorContexts(): DetectorContext[] {
    return [this.terrainObject];
  }
}
