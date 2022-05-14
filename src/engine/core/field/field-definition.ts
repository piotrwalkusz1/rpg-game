import type { Image } from 'engine/core/resources/image';
import type { TranslatableText } from 'i18n/translatable-text';

export class FieldDefinition {
  readonly name: TranslatableText;
  readonly description: TranslatableText | undefined;
  readonly image: Image | undefined;

  constructor({ name, description, image }: { name: TranslatableText; description?: TranslatableText; image?: Image }) {
    this.name = name;
    this.description = description;
    this.image = image;
  }
}
