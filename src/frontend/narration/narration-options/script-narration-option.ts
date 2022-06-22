import type { Image } from 'engine/core/resources';
import type { Script } from 'engine/core/script';
import type { TranslatableText } from 'i18n/translatable-text';
import { NarrationOption, NarrationOptionImageSize } from '../narration-option';

export class ScriptNarrationOption extends NarrationOption {
  readonly script: Script;

  constructor({
    script,
    name,
    image,
    imageSize
  }: {
    script: Script;
    name: TranslatableText;
    image: Image;
    imageSize?: NarrationOptionImageSize;
  }) {
    super({ name, image, imageSize });
    this.script = script;
  }
}
