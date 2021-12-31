import { OneToManyForeignKey } from '../../common/cache-relationship-utils';
import type { TranslatableText } from '../../i18n/translatable-text';
import type { MapField } from '../../map/model/map-field';
import { Position } from '../../map/model/position';
import type { TerrainObject } from '../../map/terrain-object/model/terrain-object';
import type { CharactersCollection } from './characters-container';
import type { Race } from './race';

class PositionFK extends OneToManyForeignKey<Character, CharactersCollection, Position> {
  override getCollectionByForeignKey = (position: Position | undefined) => position?.characters;
  override areForeignKeysEqual = Position.areEqual;
}

export class Character {
  readonly name?: string;
  readonly race: Race;
  readonly avatarUrl?: string;
  readonly positionFK: PositionFK = new PositionFK(this);

  constructor({ name, race, avatarUrl, position }: { name?: string; race: Race; avatarUrl?: string; position?: Position }) {
    this.name = name;
    this.race = race;
    this.avatarUrl = avatarUrl;
    this.positionFK.value = position;
  }

  get displayName(): TranslatableText {
    return this.name || this.race.name;
  }

  get field(): MapField | undefined {
    return this.position?.field;
  }

  get position(): Position | undefined {
    return this.positionFK.value;
  }

  set position(newPosition: Position | undefined) {
    this.positionFK.value = newPosition;
  }

  isOnField(field: MapField): boolean {
    return this.positionFK.value?.isOnField(field) || false;
  }

  isNearTerrainObject(terrainObject: TerrainObject): boolean {
    return this.positionFK.value?.isNearTerrainObject(terrainObject) || false;
  }
}
