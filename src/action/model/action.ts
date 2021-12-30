import type { TranslatableText } from '../../i18n/translatable-text';
import type { ActionExecutionContext } from './action-execution-context';

export class Action {
  constructor(
    readonly id: string,
    readonly order: number,
    readonly executeAction: (actionExecutionContext: ActionExecutionContext) => void
  ) {}

  get name(): TranslatableText {
    return { translationKey: 'ACTION.ACTION_TYPE.' + this.id };
  }
}
