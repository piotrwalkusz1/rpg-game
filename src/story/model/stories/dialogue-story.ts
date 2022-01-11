import type { Character } from '../../../character/model/character';
import type { TranslatableText } from '../../../i18n/translatable-text';
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
  constructor({
    character,
    prompt,
    narrationStages
  }: {
    character: Character;
    prompt: TranslatableText;
    narrationStages: (context: DialogueStoryStagesProviderContext) => NarrationSequenceStage[];
  }) {
    super({
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
  }
}
