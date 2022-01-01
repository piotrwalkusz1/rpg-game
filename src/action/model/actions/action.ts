import type { TranslatableText } from '../../../i18n/translatable-text';
import type { ActionContext } from '../action-context';
import type { ActionExecutionContext } from '../action-execution-context';
import type { ActionOrder } from '../action-order';

export type ActionId = 'GO_TO_TERRAIN_OBJECT' | 'GO_TO_FIELD' | 'LEAVE_TERRAIN_OBJECT' | 'SEE_LOCATION' | 'CHANGE_TERRAIN_OBJECT_PLACEMENT';

export abstract class Action {
  readonly nameContext?: TranslatableText;

  constructor({ nameContext }: { nameContext?: TranslatableText }) {
    this.nameContext = nameContext;
  }

  abstract get id(): ActionId;

  abstract get order(): ActionOrder;

  get name(): TranslatableText {
    const baseName: TranslatableText = {
      translationKey: `ACTION.ACTION_TYPE.${this.id}`,
      properties: this.getNameTranslationKeyProperties()
    };
    const nameContext = this.nameContext;
    return nameContext ? (tc) => tc.join(['[', nameContext, '] ', baseName]) : baseName;
  }

  abstract executeAction(actionExecutionContext: ActionExecutionContext): ActionContext | undefined;

  protected getNameTranslationKeyProperties(): Record<string, TranslatableText> | undefined {
    return undefined;
  }
}
