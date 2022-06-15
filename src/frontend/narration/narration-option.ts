import type { Image } from 'engine/core/resources/image';
import type { TranslatableText } from 'i18n/translatable-text';

export type NarrationOptionImageSize = 'NORMAL' | 'LARGE';

export abstract class NarrationOption {
  readonly name: TranslatableText;
  readonly image: Image;
  readonly imageSize: NarrationOptionImageSize;

  constructor({ name, image, imageSize }: { name: TranslatableText; image: Image; imageSize?: NarrationOptionImageSize }) {
    this.name = name;
    this.image = image;
    this.imageSize = imageSize || 'NORMAL';
  }
}
