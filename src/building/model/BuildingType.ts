import { TranslatableRichText } from '../../common/model/TranslatableRichText';

export class BuildingType {
  id: string;
  imageUrl: string;
  canEnter: boolean = false;

  constructor(id: string, imageUrl: string) {
    this.id = id;
    this.imageUrl = imageUrl;
  }

  getName(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('BUILDING.BUILDING_TYPE.' + this.id);
  }

  getDescription(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('BUILDING.BUILDING_TYPE.' + this.id + '.DESCRIPTION');
  }

  getDescriptionOfInside(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('BUILDING.BUILDING_TYPE.' + this.id + '.INSIDE.DESCRIPTION');
  }
}
