import type { TranslatableText } from '../../../i18n/translatable-text';
import type { ActionContext } from '../action-context';
import type { ActionExecutionContext } from '../action-execution-context';
import type { ActionOrder } from '../action-order';

export abstract class Action {
  readonly name: TranslatableText;

  constructor({ nameContext }: { nameContext?: TranslatableText }) {
    this.name = this.prepareName(nameContext);
  }

  abstract get id(): string;

  abstract get order(): ActionOrder;

  abstract executeAction(actionExecutionContext: ActionExecutionContext): ActionContext | undefined;

  protected get baseName(): TranslatableText {
    return { translationKey: 'ACTION.ACTION_TYPE.' + this.id };
  }

  private prepareName(nameContext?: TranslatableText): TranslatableText {
    return nameContext ? (tc) => tc.join(['[', nameContext, '] ', this.baseName]) : this.baseName;
  }
}
