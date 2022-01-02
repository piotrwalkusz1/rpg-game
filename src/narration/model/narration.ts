import type { TranslatableText } from '../../i18n/translatable-text';
import type { NarrationAction } from './narration-actions/narration-action';
import type { NarrationDescription } from './narration-description';

export class Narration {
  readonly title: TranslatableText;
  readonly description: NarrationDescription;
  readonly actions: NarrationAction[];
  readonly isActionRequired: boolean;

  constructor({
    title,
    description,
    actions,
    isActionRequired
  }: {
    title: TranslatableText;
    description: NarrationDescription;
    actions: NarrationAction[];
    isActionRequired?: boolean;
  }) {
    this.title = title;
    this.description = description;
    this.actions = actions;
    this.isActionRequired = isActionRequired || false;
  }
}
