import { TranslatableRichText } from '../../common/model/TranslatableRichText';

export class MapFieldType {
  static EMPTY = new MapFieldType('EMPTY', undefined);
  static GRASS = new MapFieldType('GRASS', 'images/grass.jpg');

  constructor(readonly id: string, readonly imageUrl?: string) {}

  getName(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('MAP.FIELD.' + this.id);
  }

  getDescription(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('MAP.FIELD.' + this.id + '.DESCRIPTION');
  }
}
