import { ActionService } from '../../../action/service/action-service';
import type { Character } from '../../../character/model/character';
import type { DialogueOption } from '../../../dialogue/model/dialogue-option';
import type { TranslatableText } from '../../../i18n/translatable-text';
import { Narration } from '../narration';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import { NarrationActionOrder } from '../narration-action-order';
import { NarrationDescription } from '../narration-description';
import { CustomNarrationAction } from './custom-narration-action';
import { ExitNarrationAction } from './exit-narration-action';
import { NarrationAction } from './narration-action';

export class DialogueNarrationAction extends NarrationAction {
  readonly character: Character;
  readonly dialogueOption: DialogueOption;
  readonly showNameContext: boolean;

  constructor({
    character,
    dialogueOption,
    showNameContext
  }: {
    character: Character;
    dialogueOption: DialogueOption;
    showNameContext?: boolean;
  }) {
    super();
    this.character = character;
    this.dialogueOption = dialogueOption;
    this.showNameContext = showNameContext || false;
  }

  override get order(): NarrationActionOrder {
    return NarrationActionOrder.DIALOGUE;
  }

  protected override getBaseName(): TranslatableText {
    return { translationKey: this.dialogueOption.prompt };
  }

  protected override getNameContext(): TranslatableText | undefined {
    return this.showNameContext ? this.character.displayName : undefined;
  }

  override execute(context: NarrationActionExecutionContext): Narration | undefined {
    for (const action of this.dialogueOption.actions) {
      const actionResult = ActionService.executeAction(action, context);
      switch (actionResult.type) {
        case 'SUCCESS':
          break;
        case 'PREVENTION':
          return new Narration({
            title: context.getNarration()?.title || '',
            description: actionResult.description,
            actions: [
              new CustomNarrationAction({
                name: { translationKey: 'NARRATION.COMMON.OK' },
                nextNarration: context.getNarration()
              })
            ],
            isActionRequired: context.getNarration()?.isActionRequired
          });
      }
    }

    const dialogue = this.dialogueOption.dialogueProvider();
    if (!dialogue) {
      return undefined;
    }
    const actions = dialogue.options
      .filter((option) => option.condition())
      .map((option) => new DialogueNarrationAction({ character: this.character, dialogueOption: option }));
    return new Narration({
      description: new NarrationDescription({ translationKey: dialogue.text }, this.character),
      actions: actions.length > 0 ? actions : [new ExitNarrationAction({ translationKey: 'DIALOGUE.COMMON.EXIT' })],
      isActionRequired: true
    });
  }
}
