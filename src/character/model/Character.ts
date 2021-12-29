import { TranslatableRichText } from '../../common/model/TranslatableRichText';
import { MapField } from '../../map/model/MapField';
import { CharacterPosition } from './CharacterPosition';
import { Race } from './Race';

export class Character {
  readonly name?: string;
  readonly race: Race;
  readonly avatarUrl?: string;
  _position?: CharacterPosition;

  constructor({
    name,
    race,
    avatarUrl,
    field,
    position
  }: {
    name?: string;
    race: Race;
    avatarUrl?: string;
    field?: MapField;
    position?: CharacterPosition;
  }) {
    this.name = name;
    this.race = race;
    this.avatarUrl = avatarUrl;
    if (position) {
      if (position.field !== field) {
        throw new Error('"position.field" and "field" must be equal');
      }
      this.position = position;
    } else if (field) {
      this.field = field;
    }
  }

  get displayName(): TranslatableRichText {
    return this.name ? TranslatableRichText.fromText(this.name) : this.race.name;
  }

  get position(): CharacterPosition | undefined {
    return this._position;
  }

  set position(newPosition: CharacterPosition | undefined) {
    if (this._position === newPosition) {
      return;
    }
    if (this.field !== newPosition?.field) {
      const oldField = this.field;
      this._position = newPosition;
      oldField?.removeCharacter(this);
      newPosition?.field.addCharacter(this);
    } else {
      this._position = newPosition;
    }
  }

  get field(): MapField | undefined {
    return this._position?.field;
  }

  set field(newField: MapField | undefined) {
    if (this.field === newField) {
      return;
    }
    const oldField = this.field;
    this._position = newField && new CharacterPosition({ field: newField });
    oldField?.removeCharacter(this);
    newField?.addCharacter(this);
  }

  setTerrainObjectPlacementToDefaultValue() {
    if (this._position) {
      const defaultPlacementOnFieldWithBuildingType = this._position.field.terrainObjectType?.defaultCharacterPlacement;
      this._position = this._position.withTerrainObjectPlacementType(defaultPlacementOnFieldWithBuildingType);
    }
  }
}
