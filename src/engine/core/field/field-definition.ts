import type { TranslatableText } from 'i18n/translatable-text';

export class FieldDefinition {
  readonly name: TranslatableText;
  readonly imageUrl: string | undefined;

  constructor({ name, imageUrl }: { name: TranslatableText; imageUrl?: string }) {
    this.name = name;
    this.imageUrl = imageUrl;
  }
}
