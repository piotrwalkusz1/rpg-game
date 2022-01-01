import type { TranslatableText } from '../../../i18n/translatable-text';
import type { ActionContext } from '../action-context';
import type { ActionExecutionContext } from '../action-execution-context';
import type { ActionOrder } from '../action-order';

export abstract class Action {
  readonly name: TranslatableText;

  constructor({
    nameTranslationProperties,
    nameContext
  }: {
    nameTranslationProperties?: Record<string, TranslatableText>;
    nameContext?: TranslatableText;
  }) {
    this.name = this.prepareName(nameTranslationProperties, nameContext);
  }

  abstract get id(): string;

  abstract get order(): ActionOrder;

  abstract executeAction(actionExecutionContext: ActionExecutionContext): ActionContext | undefined;

  private prepareName(nameTranslationProperties?: Record<string, TranslatableText>, nameContext?: TranslatableText): TranslatableText {
    const name = { translationKey: 'ACTION.ACTION_TYPE.' + this.id, properties: nameTranslationProperties };
    return nameContext ? (tc) => tc.join(['[', nameContext, '] ', name]) : name;
  }
}
