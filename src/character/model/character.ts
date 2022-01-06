import { OneToManyCollection, OneToManyForeignKey } from '../../common/cache-relationship-utils';
import type { TranslatableText } from '../../i18n/translatable-text';
import type { MapField } from '../../map/model/map-field';
import { Position } from '../../map/model/position';
import type { TerrainObject } from '../../map/terrain-object/model/terrain-object';
import type { Race } from './race';

export class CharactersCollection extends OneToManyCollection<Character, Position> {
  override getForeignKey = (character: Character) => character.positionFK;
}

class CharacterPositionFK extends OneToManyForeignKey<Character, CharactersCollection, Position> {
  override getCollection = (position: Position | undefined) => position?.characters;
  override areForeignKeysEqual = Position.areEqual;
}

export class Character {
  readonly name?: string;
  readonly race: Race;
  readonly avatarUrl?: string;
  readonly positionFK: CharacterPositionFK = new CharacterPositionFK(this);
  healthPoints: number = 20;
  maxHealthPoints: number = 100;
  damage: number = 10;

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

  get lostPercentageOfHealth(): number {
    return Math.round((100 * (this.maxHealthPoints - this.healthPoints)) / this.maxHealthPoints);
  }

  isOnField(field: MapField): boolean {
    return this.positionFK.value?.isOnField(field) || false;
  }

  isNearTerrainObject(terrainObject: TerrainObject): boolean {
    return this.positionFK.value?.isNearTerrainObject(terrainObject) || false;
  }

  dealDamage(damage: number): void {
    this.healthPoints = Math.max(this.healthPoints - damage, 0);
  }
}
