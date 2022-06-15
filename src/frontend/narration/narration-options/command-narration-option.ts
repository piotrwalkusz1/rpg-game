import type { Command } from 'engine/core/command';
import type { Image } from 'engine/core/resources/image';
import type { TranslatableText } from 'i18n/translatable-text';
import { NarrationOption } from '../narration-option';

export class CommandNarrationOption extends NarrationOption {
  readonly command: Command;

  constructor({ name, image, command }: { name: TranslatableText; image: Image; command: Command }) {
    super({ name, image });
    this.command = command;
  }
}
