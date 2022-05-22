import type { Engine } from 'engine/core/ecs';
import type { Image } from 'engine/core/resources/image';
import type { TranslatableText } from 'i18n/translatable-text';
import type { NarrationContext } from './narration-context';

export type NarrationOptionImageSize = 'NORMAL' | 'LARGE';

export type NarrationOptionParams = {
  engine: Engine;
  refreshEngine: () => void;
  setNarrationContext: (narrationContext: NarrationContext) => void;
};

export abstract class NarrationOption {
  readonly name: TranslatableText;
  readonly image: Image;
  readonly imageSize: NarrationOptionImageSize;

  constructor({ name, image, imageSize }: { name: TranslatableText; image: Image; imageSize?: NarrationOptionImageSize }) {
    this.name = name;
    this.image = image;
    this.imageSize = imageSize || 'NORMAL';
  }

  abstract onClick(params: NarrationOptionParams): Promise<void>;
}
