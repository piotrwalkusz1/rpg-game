import type { Command } from 'engine/core/command';
import type { Field } from 'engine/core/field';
import type { TranslatableText } from 'i18n/translatable-text';

export class CommandHint {
  readonly command: Command;
  readonly name: TranslatableText;
  readonly imageUrl: string;
  readonly field: Field | undefined;

  constructor({ command, name, imageUrl, field }: { command: Command; name: TranslatableText; imageUrl: string; field?: Field }) {
    this.command = command;
    this.name = name;
    this.imageUrl = imageUrl;
    this.field = field;
  }
}
