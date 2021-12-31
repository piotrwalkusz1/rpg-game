import type { TranslatableText } from '../../i18n/translatable-text';
import { MapFieldKind } from './map-field-kind';

export class MapFieldType {
  static LOWLANDS = new MapFieldType('LOWLANDS', 'images/grass.jpg', MapFieldKind.REGION);
  static MEADOW = new MapFieldType('MEADOW', 'images/grass.jpg', MapFieldKind.FIELD);
  static GRASS = new MapFieldType('GRASS', 'images/grass.jpg', MapFieldKind.FIELD);

  readonly id: string;
  readonly imageUrl: string;
  readonly kind: MapFieldKind;

  constructor(id: string, imageUrl: string, kind: MapFieldKind) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.kind = kind;
  }

  get name(): TranslatableText {
    return { translationKey: 'MAP.FIELD.' + this.id };
  }

  get description(): TranslatableText {
    return { translationKey: 'MAP.FIELD.' + this.id + '.DESCRIPTION' };
  }
}
