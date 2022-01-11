import type { TranslatableText } from '../../../i18n/translatable-text';
import { NarrationAction } from '../../../narration/model/narration-actions/narration-action';
import type { NarrationActionNameContext } from '../../../narration/model/narration-actions/narration-action-name-context';
import { NarrationSequence } from '../../../narration/model/narration-sequence/narration-sequence';
import type { NarrationSequenceStage } from '../../../narration/model/narration-sequence/narration-sequence-stage';
import { Story } from '../story';

interface SingleNarrationSequenceStoryStagesProviderContext {
  setPrompt(prompt: TranslatableText): void;
  finish(): void;
  createNarrationAction(args: { name: TranslatableText; narrationStages: NarrationSequenceStage[] }): NarrationAction;
}

export class SingleNarrationSequenceStory extends Story {
  private prompt: TranslatableText | undefined;
  private promptNameContext: NarrationActionNameContext | undefined;
  private readonly narrationSequence: NarrationSequence;

  constructor({
    prompt,
    promptNameContext,
    title,
    narrationStages
  }: {
    prompt: TranslatableText;
    promptNameContext?: NarrationActionNameContext;
    title?: TranslatableText;
    narrationStages: (context: SingleNarrationSequenceStoryStagesProviderContext) => NarrationSequenceStage[];
  }) {
    super();
    this.prompt = prompt;
    this.promptNameContext = promptNameContext;
    this.narrationSequence = new NarrationSequence({
      title,
      checkpointStages: (sequence) =>
        narrationStages({
          setPrompt: (prompt) => (this.prompt = prompt),
          finish: () => (this.prompt = undefined),
          createNarrationAction: ({ name, narrationStages }) => new NarrationAction({ name, narrationSequence: sequence, narrationStages })
        })
    });
  }

  override getNarrationActions(): NarrationAction[] {
    return this.prompt
      ? [
          new NarrationAction({
            name: this.prompt,
            nameContext: this.promptNameContext,
            narrationSequence: this.narrationSequence
          })
        ]
      : [];
  }
}
