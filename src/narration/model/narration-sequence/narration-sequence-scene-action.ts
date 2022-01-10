import type { TranslatableText } from '../../../i18n/translatable-text';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export class NarrationSequenceSceneAction {
  readonly name: TranslatableText;
  readonly nextStages: () => NarrationSequenceStage[];

  constructor(name: TranslatableText, nextStages?: NarrationSequenceStage[] | (() => NarrationSequenceStage[])) {
    this.name = name;
    this.nextStages = nextStages === undefined ? () => [] : Array.isArray(nextStages) ? () => nextStages : nextStages;
  }
}
