import type { DialogueOption } from './dialogue-option';

type DialogueId =
  | '00001_YES'
  | '00002_NO'
  | '10001_DO_YOU_KNOW_ANYTHING_INTERESTING_ABOUT_THIS_AREA'
  | '10002_THERE_IS_BURIED_TREASURE'
  | '10003_JUST_DONT_FORGET_TO_SHARE_IT'
  | '10004_NO_ONE_HAS_FOUND_IT_YET_ANYWAY';

export type DialogueTranslationKey = `DIALOGUE.TEXT.${DialogueId}`;

export class Dialogue {
  readonly text: DialogueTranslationKey;
  readonly options: DialogueOption[];

  constructor({ text, options }: { text: DialogueTranslationKey; options?: DialogueOption[] }) {
    this.text = text;
    this.options = options || [];
  }
}
