import type { TranslatableText } from '../../../../i18n/translatable-text';
import { NarrationAction } from './narration-actions/narration-action';
import type { NarrationDescription } from './narration-description';
import { NarrationSequence } from './narration-sequence/narration-sequence';

export class Narration {
  readonly title?: TranslatableText;
  readonly description: NarrationDescription;
  readonly actions: NarrationAction[];
  readonly isActionRequired: boolean;

  constructor({
    title,
    description,
    actions,
    isActionRequired
  }: {
    title?: TranslatableText;
    description: NarrationDescription;
    actions: NarrationAction[];
    isActionRequired?: boolean;
  }) {
    actions =
      actions.length > 0 || !isActionRequired
        ? actions
        : [
            new NarrationAction({
              name: 'NARRATION.COMMON.OK',
              narrationSequence: new NarrationSequence({ checkpointStages: [] })
            })
          ];

    this.title = title;
    this.description = description;
    this.actions = actions;
    this.isActionRequired = isActionRequired || false;
  }
}
