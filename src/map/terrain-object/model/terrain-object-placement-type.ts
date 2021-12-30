import type { Character } from '../../../character/model/character';
import type { TranslatableText } from '../../../i18n/translatable-text';
import { convertTranslatableTextToString } from '../../../i18n/translatable-text';

export class TerrainObjectPlacementType {
  static readonly OUTSIDE = new TerrainObjectPlacementType('OUTSIDE');
  static readonly INSIDE = new TerrainObjectPlacementType('INSIDE');

  constructor(readonly id: string) {}

  get name(): TranslatableText {
    return { translationKey: 'MAP.TERRAIN_OBJECT_PLACEMENT.' + this.id };
  }

  getCharacterDescription(character: Character): TranslatableText {
    return (t) => {
      const characterName = convertTranslatableTextToString(t, character.displayName);
      return t('MAP.TERRAIN_OBJECT_PLACEMENT.' + this.id + '.CHARACTER_DESCRIPTION', {
        characterName: characterName
      });
    };
  }
}
