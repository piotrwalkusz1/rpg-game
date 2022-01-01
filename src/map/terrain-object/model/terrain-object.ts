import { Character, CharactersCollection } from '../../../character/model/character';
import { OneToManyForeignKey } from '../../../common/cache-relationship-utils';
import { areSame } from '../../../common/object-utils';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapField, TerrainObjectsCollection } from '../../model/map-field';
import { TerrainObjectPosition } from '../../model/position';
import type { TerrainObjectType } from './terrain-object-type';

class TerrainObjectFieldFK extends OneToManyForeignKey<TerrainObject, TerrainObjectsCollection, MapField> {
  override getCollection = (field?: MapField) => field?.terrainObjects;
  override areForeignKeysEqual = areSame;
}

export class TerrainObject {
  readonly type: TerrainObjectType;
  readonly guards: Array<Character>;
  readonly fieldFK: TerrainObjectFieldFK = new TerrainObjectFieldFK(this);
  readonly characters: CharactersCollection;

  constructor({ type, field, guards }: { type: TerrainObjectType; field?: MapField; guards?: Array<Character> }) {
    this.type = type;
    this.guards = guards || [];
    this.fieldFK.value = field;
    this.characters = new CharactersCollection(new TerrainObjectPosition(this, this.type.defaultCharacterPlacement));
  }

  get imageUrl(): string {
    return this.type.imageUrl;
  }

  get field(): MapField | undefined {
    return this.fieldFK.value;
  }

  set field(field: MapField | undefined) {
    this.fieldFK.value = field;
  }

  get name(): TranslatableText {
    return this.type.name;
  }
}
