import type { Action } from './action';
import type { ActionContextDescription } from './action-conctext-description';
import type { TranslatableText } from '../../i18n/translatable-text';

export class ActionContext {
  constructor(
    readonly title: TranslatableText,
    readonly description: ActionContextDescription,
    readonly isActionRequired: boolean,
    readonly actions: Array<Action>
  ) {}
}
