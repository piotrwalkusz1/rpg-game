import type { TranslatableText } from '../../../i18n/translatable-text';
import { NarrationAction } from '../../../narration/model/narration-actions/narration-action';
import type { NarrationActionNameContext } from '../../../narration/model/narration-actions/narration-action-name-context';
import type { NarrationSequence } from '../../../narration/model/narration-sequence/narration-sequence';
import { Story } from '../story';

export class SingleNarrationSequenceStory extends Story {
  private narrationActionName: TranslatableText | undefined;
  private narrationActionNameContext: NarrationActionNameContext | undefined;
  private readonly narrationSequence: NarrationSequence;

  constructor({
    actionName,
    actionNameContext,
    narrationSequence
  }: {
    actionName: TranslatableText;
    actionNameContext?: NarrationActionNameContext;
    narrationSequence: (setNarrationActionName: (name: TranslatableText | undefined) => void) => NarrationSequence;
  }) {
    super();
    this.narrationActionName = actionName;
    this.narrationActionNameContext = actionNameContext;
    this.narrationSequence = narrationSequence((name: TranslatableText | undefined) => (this.narrationActionName = name));
  }

  override getNarrationActions(): NarrationAction[] {
    return this.narrationActionName
      ? [
          new NarrationAction({
            name: this.narrationActionName,
            nameContext: this.narrationActionNameContext,
            narrationSequence: this.narrationSequence
          })
        ]
      : [];
  }
}
