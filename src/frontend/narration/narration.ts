import type { Image } from 'frontend/image';
import type { TranslatableText } from 'i18n/translatable-text';
import type { NarrationOption } from './narration-option';

export class Narration {
  readonly title: TranslatableText;
  readonly description?: TranslatableText;
  readonly image?: Image;
  readonly options: NarrationOption[];

  constructor({
    title,
    description,
    image,
    options
  }: {
    title: TranslatableText;
    description?: TranslatableText;
    image?: Image;
    options: NarrationOption[];
  }) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.options = options;
  }
}
