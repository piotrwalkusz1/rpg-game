import type { TranslatableText } from '../../../../../i18n/translatable-text';
import { HearingService } from '../../../../modules/hearing/service/hearing-service';
import type { Actor } from '../../../actor/model/actor';
import type { GameState } from '../../../game/model/game-state';
import type { NarrationAction } from '../../../narration/model/narration-actions/narration-action';
import { NarrationDescription } from '../../../narration/model/narration-description';
import type { NarrationSequenceStage } from '../../../narration/model/narration-sequence/narration-sequence-stage';
import { SingleNarrationSequenceStory } from './single-narration-sequence-story';

interface DialogueStoryStagesProviderContext {
  setPrompt(prompt: TranslatableText): void;
  finish(): void;
  createNarrationAction(args: { name: TranslatableText; narrationStages: NarrationSequenceStage[] }): NarrationAction;
  createNarrationDescription(description: TranslatableText): NarrationDescription;
}

export class DialogueStory extends SingleNarrationSequenceStory {
  private readonly character: Actor;

  constructor({
    character,
    prompt,
    narrationStages
  }: {
    character: Actor;
    prompt?: TranslatableText;
    narrationStages: (context: DialogueStoryStagesProviderContext) => NarrationSequenceStage[];
  }) {
    super({
      narrationProviderOwner: character,
      prompt,
      promptNameContext: character,
      title: character.displayName,
      narrationStages: ({ setPrompt, finish, createNarrationAction }) => {
        return narrationStages({
          setPrompt,
          finish,
          createNarrationAction,
          createNarrationDescription: (description) => new NarrationDescription(description, character)
        });
      }
    });
    this.character = character;
  }

  protected override isNarrationSequencePossibleToExecute(gameState: GameState): boolean {
    return HearingService.canTalk(this.character, gameState.player);
  }
}
