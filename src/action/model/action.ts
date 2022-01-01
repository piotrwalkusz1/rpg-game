import type { TranslatableText } from '../../i18n/translatable-text';
import type { ActionContext } from './action-context';
import type { ActionExecutionContext } from './action-execution-context';

export class Action {
  readonly id: string;
  readonly name: TranslatableText;
  readonly order: number;
  readonly executeAction: (actionExecutionContext: ActionExecutionContext) => ActionContext | undefined;

  constructor({
    id,
    nameTranslationProperties,
    order,
    executeAction
  }: {
    id: string;
    nameTranslationProperties?: { [key: string]: any };
    order: number;
    executeAction: (actionExecutionContext: ActionExecutionContext) => ActionContext | undefined;
  }) {
    this.id = id;
    this.name = { translationKey: 'ACTION.ACTION_TYPE.' + this.id, properties: nameTranslationProperties };
    this.order = order;
    this.executeAction = executeAction;
  }
}
