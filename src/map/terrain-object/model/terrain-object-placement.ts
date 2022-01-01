import type { Character } from '../../../character/model/character';
import type { TranslatableText } from '../../../i18n/translatable-text';

export class TerrainObjectPlacement {
  static readonly OUTSIDE = new TerrainObjectPlacement('OUTSIDE');
  static readonly INSIDE = new TerrainObjectPlacement('INSIDE');

  constructor(readonly id: string) {}

  get name(): TranslatableText {
    return { translationKey: 'MAP.TERRAIN_OBJECT_PLACEMENT.' + this.id };
  }

  getMovementActivityName(): TranslatableText {
    return { translationKey: 'MAP.TERRAIN_OBJECT_PLACEMENT.' + this.id + '.MOVEMENT_ACTIVITY' };
  }

  getCharacterDescription(character: Character): TranslatableText {
    return {
      translationKey: 'MAP.TERRAIN_OBJECT_PLACEMENT.' + this.id + '.CHARACTER_DESCRIPTION',
      properties: {
        characterName: character.displayName
      }
    };
  }
}
