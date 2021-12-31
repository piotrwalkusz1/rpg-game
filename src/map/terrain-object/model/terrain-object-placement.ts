import type { Character } from '../../../character/model/character';
import { convertTranslatableTextToString, TranslatableText } from '../../../i18n/translatable-text';

export class TerrainObjectPlacement {
  static readonly OUTSIDE = new TerrainObjectPlacement('OUTSIDE');
  static readonly INSIDE = new TerrainObjectPlacement('INSIDE');

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
