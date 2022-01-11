import type { TranslatableText } from '../../../i18n/translatable-text';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export class NarrationSequence {
  readonly title: TranslatableText | undefined;
  checkpointStages: NarrationSequenceStage[];

  constructor({
    title,
    checkpointStages
  }: {
    title?: TranslatableText;
    checkpointStages: NarrationSequenceStage[] | ((narrationSequence: NarrationSequence) => NarrationSequenceStage[]);
  }) {
    this.title = title;
    this.checkpointStages = Array.isArray(checkpointStages) ? checkpointStages : checkpointStages(this);
  }
}