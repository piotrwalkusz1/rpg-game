import type { TranslatableText } from '../../i18n/translatable-text';
import type { Action } from './actions/action';
import type { ActionContextDescription } from './action-conctext-description';

export class ActionContext {
  readonly title: TranslatableText;
  readonly description: ActionContextDescription;
  readonly actions: Action[];
  readonly isActionRequired: boolean;

  constructor({
    description,
    title,
    actions,
    isActionRequired
  }: {
    title: TranslatableText;
    description: ActionContextDescription;
    actions: Action[];
    isActionRequired?: boolean;
  }) {
    this.title = title;
    this.description = description;
    this.actions = actions;
    this.isActionRequired = isActionRequired || false;
  }
}
