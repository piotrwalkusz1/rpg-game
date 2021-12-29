import { TranslatableRichText } from '../../common/model/TranslatableRichText';

export class BuildingType {
  id: string;
  imageUrl: string;
  description: TranslatableRichText;

  constructor(id: string, imageUrl: string, description: TranslatableRichText) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  getName(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('BUILDING.BUILDING_TYPE.' + this.id);
  }
}
