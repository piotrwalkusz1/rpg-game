import { TranslatableRichText } from '../../common/model/TranslatableRichText';
import { CharacterPlacementOnFieldWithBuildingType } from './CharacterPlacementOnFieldWithBuildingType';

export class BuildingType {
  readonly id: string;
  readonly imageUrl: string;
  readonly allowedCharacterPlacements: Array<CharacterPlacementOnFieldWithBuildingType>;
  readonly defaultCharacterPlacement: CharacterPlacementOnFieldWithBuildingType;

  constructor({
    id,
    imageUrl,
    allowedCharacterPlacements,
    defaultCharacterPlacement
  }: {
    id: string;
    imageUrl: string;
    allowedCharacterPlacements: Array<CharacterPlacementOnFieldWithBuildingType>;
    defaultCharacterPlacement: CharacterPlacementOnFieldWithBuildingType;
  }) {
    if (allowedCharacterPlacements.length === 0) {
      throw new Error('At least one character placement required');
    }
    if (!allowedCharacterPlacements.includes(defaultCharacterPlacement)) {
      throw new Error('Default character placement must be in allowed character placements array');
    }

    this.id = id;
    this.imageUrl = imageUrl;
    this.allowedCharacterPlacements = allowedCharacterPlacements;
    this.defaultCharacterPlacement = defaultCharacterPlacement;
  }

  get canEnter(): boolean {
    return this.allowedCharacterPlacements.includes(CharacterPlacementOnFieldWithBuildingType.INSIDE);
  }

  get name(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('BUILDING.BUILDING_TYPE.' + this.id);
  }

  get description(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('BUILDING.BUILDING_TYPE.' + this.id + '.DESCRIPTION');
  }

  get descriptionOfInside(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('BUILDING.BUILDING_TYPE.' + this.id + '.INSIDE.DESCRIPTION');
  }
}
