import type { TranslatableText } from '../../../i18n/translatable-text';
import type { Narration } from '../narration';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import type { NarrationActionExecutionResult } from '../narration-action-execution-result';
import type { NarrationActionOrder } from '../narration-action-order';

export type NarrationActionId =
  | 'GO_TO_TERRAIN_OBJECT'
  | 'GO_TO_FIELD'
  | 'LEAVE_TERRAIN_OBJECT'
  | 'SEE_LOCATION'
  | 'CHANGE_TERRAIN_OBJECT_PLACEMENT';

export abstract class NarrationAction {
  abstract get id(): NarrationActionId;

  abstract get order(): NarrationActionOrder;

  getName(): TranslatableText {
    const baseName: TranslatableText = {
      translationKey: `NARRATION.ACTION.${this.id}`,
      properties: this.getNameTranslationKeyProperties()
    };
    const nameContext = this.getNameContext();
    return nameContext ? (tc) => tc.join(['[', nameContext, '] ', baseName]) : baseName;
  }

  abstract execute(narrationActionExecutionContext: NarrationActionExecutionContext): NarrationActionExecutionResult;

  getNextNarration(): Narration | undefined {
    return undefined;
  }

  protected getNameContext(): TranslatableText | undefined {
    return undefined;
  }

  protected getNameTranslationKeyProperties(): Record<string, TranslatableText> | undefined {
    return undefined;
  }
}
