import type { TranslatableText } from '../../i18n/translatable-text';

export class MapFieldType {
  static EMPTY = new MapFieldType('EMPTY', undefined);
  static GRASS = new MapFieldType('GRASS', 'images/grass.jpg');

  constructor(readonly id: string, readonly imageUrl?: string) {}

  getName(): TranslatableText {
    return { translationKey: 'MAP.FIELD.' + this.id };
  }

  getDescription(): TranslatableText {
    return { translationKey: 'MAP.FIELD.' + this.id + '.DESCRIPTION' };
  }
}
