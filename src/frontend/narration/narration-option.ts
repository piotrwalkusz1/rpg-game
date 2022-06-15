import type { CDIContainer } from 'cdi-container';
import type { GameEngine } from 'engine/core/game';
import type { Image } from 'engine/core/resources/image';
import type { TranslatableText } from 'i18n/translatable-text';
import type { NarrationContext } from './narration-context';

export type NarrationOptionImageSize = 'NORMAL' | 'LARGE';

export type NarrationOptionParams = {
  engine: GameEngine;
  processEvents: () => Promise<void>;
  setNarrationContext: (narrationContext: NarrationContext) => void;
  cdiContainer: CDIContainer;
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
