import type { TranslatableText } from '../../../i18n/translatable-text';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export class NarrationSequenceSceneAction {
  constructor(readonly name: () => TranslatableText, readonly nextStage: () => NarrationSequenceStage | undefined) {}
}
