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
    nameContext,
    order,
    executeAction
  }: {
    id: string;
    nameTranslationProperties?: Record<string, TranslatableText>;
    nameContext?: TranslatableText;
    order: number;
    executeAction: (actionExecutionContext: ActionExecutionContext) => ActionContext | undefined;
  }) {
    this.id = id;
    this.name = Action.prepareName(id, nameTranslationProperties, nameContext);
    this.order = order;
    this.executeAction = executeAction;
  }

  private static prepareName(
    id: string,
    nameTranslationProperties?: Record<string, TranslatableText>,
    nameContext?: TranslatableText
  ): TranslatableText {
    const name = { translationKey: 'ACTION.ACTION_TYPE.' + id, properties: nameTranslationProperties };
    return nameContext ? (tc) => tc.join(['[', nameContext, '] ', name]) : name;
  }
}
