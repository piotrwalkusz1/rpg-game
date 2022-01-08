import type { TranslatableText } from '../../../i18n/translatable-text';
import type { Narration } from '../narration';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import type { NarrationActionOrder } from '../narration-action-order';

export abstract class NarrationAction {
  abstract get order(): NarrationActionOrder;

  getName(): TranslatableText {
    const nameContext = this.getNameContext();
    const baseName = this.getBaseName();
    return nameContext ? (tc) => tc.join(['[', nameContext, '] ', baseName]) : baseName;
  }

  protected abstract getBaseName(): TranslatableText;

  protected getNameContext(): TranslatableText | undefined {
    return undefined;
  }

  abstract execute(narrationActionExecutionContext: NarrationActionExecutionContext): Narration | undefined;
}
