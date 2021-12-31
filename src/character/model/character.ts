import { createManyToOneRelationship } from '../../common/cache-relationship-utils';
import type { TranslatableText } from '../../i18n/translatable-text';
import type { MapField } from '../../map/model/map-field';
import type { Position } from '../../map/model/position';
import type { TerrainObject } from '../../map/terrain-object/model/terrain-object';
import type { Race } from './race';
import type { CharactersContainer } from './characters-container';

export class Character {
  private static readonly POSITION_RELATIONSHIP = createManyToOneRelationship<Character, CharactersContainer, Position>({
    getForeignKey: (character) => character._position,
    setForeignKeyInternally: (character, newPosition) => (character._position = newPosition),
    areForeignKeysEqual: (firstPosition, secondPosition) => firstPosition === secondPosition,
    getParent: (position) => position?.characters,
    addChild: (charactersContainer, character) => charactersContainer.add(character),
    removeChild: (charactersContainer, character) => charactersContainer.remove(character)
  });

  readonly name?: string;
  readonly race: Race;
  readonly avatarUrl?: string;
  private _position?: Position;

  constructor({ name, race, avatarUrl, position }: { name?: string; race: Race; avatarUrl?: string; position?: Position }) {
    this.name = name;
    this.race = race;
    this.avatarUrl = avatarUrl;
    this.position = position;
  }

  get displayName(): TranslatableText {
    return this.name || this.race.name;
  }

  get field(): MapField | undefined {
    return this._position?.field;
  }

  get position(): Position | undefined {
    return this._position;
  }

  set position(newPosition: Position | undefined) {
    Character.POSITION_RELATIONSHIP.setForeignKey(this, newPosition);
  }

  isOnField(field: MapField): boolean {
    return this.position?.isOnField(field) || false;
  }

  isNearTerrainObject(terrainObject: TerrainObject): boolean {
    return this.position?.isNearTerrainObject(terrainObject) || false;
  }
}
