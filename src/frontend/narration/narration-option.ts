import type { Engine } from 'engine/core/ecs';
import type { Image } from 'frontend/image';
import type { TranslatableText } from 'i18n/translatable-text';

export abstract class NarrationOption {
  readonly name: TranslatableText;
  readonly image: Image;

  constructor({ name, image }: { name: TranslatableText; image: Image }) {
    this.name = name;
    this.image = image;
  }

  abstract onClick(engine: Engine): Promise<void>;
}
