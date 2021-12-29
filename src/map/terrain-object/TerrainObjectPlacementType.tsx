import { Character } from '../../character/model/Character';
import { TranslatableRichText } from '../../common/model/TranslatableRichText';

export class TerrainObjectPlacementType {
  static readonly OUTSIDE = new TerrainObjectPlacementType('OUTSIDE');
  static readonly INSIDE = new TerrainObjectPlacementType('INSIDE');

  constructor(readonly id: string) {}

  get name(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('MAP.TERRAIN_OBJECT_PLACEMENT.' + this.id);
  }

  getCharacterDescription(character: Character): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('MAP.TERRAIN_OBJECT_PLACEMENT.' + this.id + '.CHARACTER_DESCRIPTION', {
      character: character.displayName
    });
  }
}
