import { Character } from '../../character/model/Character';
import { TranslatableRichText } from '../../common/model/TranslatableRichText';

export class CharacterPlacementOnFieldWithBuildingType {
  static readonly OUTSIDE = new CharacterPlacementOnFieldWithBuildingType('OUTSIDE');
  static readonly INSIDE = new CharacterPlacementOnFieldWithBuildingType('INSIDE');

  constructor(readonly id: string) {}

  get name(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('BUILDING.CHARACTER_PLACEMENT_ON_FIELD_WITH_BUILDING.' + this.id);
  }

  getCharacterDescription(character: Character): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey(
      'BUILDING.CHARACTER_PLACEMENT_ON_FIELD_WITH_BUILDING.' + this.id + '.CHARACTER_DESCRIPTION',
      { character: character.displayName }
    );
  }
}
