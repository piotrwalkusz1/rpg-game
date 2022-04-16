import type { TranslatableText } from '../../../../../i18n/translatable-text';
import type { GameState } from '../../../game/model/game-state';
import { NarrationAction } from '../../../narration/model/narration-actions/narration-action';
import type { NarrationActionNameContext } from '../../../narration/model/narration-actions/narration-action-name-context';
import type { NarrationProviderOwner } from '../../../narration/model/narration-provider/narration-provider-owner';
import { NarrationSequence } from '../../../narration/model/narration-sequence/narration-sequence';
import type { NarrationSequenceStage } from '../../../narration/model/narration-sequence/narration-sequence-stage';
import { Story } from '../story';

interface SingleNarrationSequenceStoryStagesProviderContext {
  setPrompt(prompt: TranslatableText): void;
  finish(): void;
  createNarrationAction(args: { name: TranslatableText; narrationStages: NarrationSequenceStage[] }): NarrationAction;
}

export class SingleNarrationSequenceStory extends Story {
  private narrationProviderOwner: NarrationProviderOwner;
  private prompt: TranslatableText | undefined;
  private promptNameContext: NarrationActionNameContext | undefined;
  private readonly narrationSequence: NarrationSequence;

  constructor({
    narrationProviderOwner,
    prompt,
    promptNameContext,
    title,
    narrationStages
  }: {
    narrationProviderOwner: NarrationProviderOwner;
    prompt?: TranslatableText;
    promptNameContext?: NarrationActionNameContext;
    title?: TranslatableText;
    narrationStages: (context: SingleNarrationSequenceStoryStagesProviderContext) => NarrationSequenceStage[];
  }) {
    super();
    this.narrationProviderOwner = narrationProviderOwner;
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

  override initialize(_gameState: GameState): void {
    this.narrationProviderOwner.narrationProviders.push(() => ({
      actions: this.getNarrationActions(_gameState)
    }));
  }

  protected getNarrationActions(gameState: GameState): NarrationAction[] {
    const narrationSequence = this.getNarrationSequenceIfPossibleToExecute(gameState);
    return this.prompt && narrationSequence
      ? [
          new NarrationAction({
            name: this.prompt,
            nameContext: this.promptNameContext,
            narrationSequence
          })
        ]
      : [];
  }

  getNarrationSequenceIfPossibleToExecute(gameState: GameState): NarrationSequence | undefined {
    if (this.isNarrationSequencePossibleToExecute(gameState)) {
      return this.narrationSequence;
    }
  }

  protected isNarrationSequencePossibleToExecute(_gameState: GameState): boolean {
    return true;
  }
}