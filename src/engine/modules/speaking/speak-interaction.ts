import { Entity, EntityProvider } from 'engine/core/ecs';
import type { TranslatableText } from 'i18n/translatable-text';
import { Interaction } from '../interaction';

export class SpeakInteraction extends Interaction {
  readonly receivers: Entity[];
  readonly content: TranslatableText;
  readonly quote: boolean;

  constructor({ receivers, content, quote }: { receivers: EntityProvider[]; content: TranslatableText; quote: boolean }) {
    super();
    this.receivers = EntityProvider.getEntities(receivers);
    this.content = content;
    this.quote = quote;
  }
}
