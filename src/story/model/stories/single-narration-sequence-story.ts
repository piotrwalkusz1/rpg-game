import type { TranslatableText } from '../../../i18n/translatable-text';
import { CustomSequenceNarrationAction } from '../../../narration/model/narration-actions/custom-sequence-narration-action';
import type { NarrationAction } from '../../../narration/model/narration-actions/narration-action';
import type { NarrationSequence } from '../../../narration/model/narration-sequence/narration-sequence';
import { Story } from '../story';

export class SingleNarrationSequenceStory extends Story {
  private narrationActionName: TranslatableText | undefined;
  private readonly narrationSequence: NarrationSequence;

  constructor(
    narrationActionName: TranslatableText,
    narrationSequenceProvider: (setNarrationActionName: (name: TranslatableText | undefined) => void) => NarrationSequence
  ) {
    super();
    this.narrationActionName = narrationActionName;
    this.narrationSequence = narrationSequenceProvider((name: TranslatableText | undefined) => (this.narrationActionName = name));
  }

  override getNarrationActions(): NarrationAction[] {
    return this.narrationActionName
      ? [new CustomSequenceNarrationAction({ name: this.narrationActionName, narrationSequence: this.narrationSequence })]
      : [];
  }
}
