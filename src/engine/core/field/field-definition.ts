import type { TranslatableText } from 'i18n/translatable-text';

export class FieldDefinition {
  readonly name: TranslatableText;
  readonly description: TranslatableText | undefined;
  readonly imageUrl: string | undefined;

  constructor({ name, description, imageUrl }: { name: TranslatableText; description?: TranslatableText; imageUrl?: string }) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
