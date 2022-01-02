import type { TranslatableText } from '../../../i18n/translatable-text';
import type { Narration } from '../narration';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import type { NarrationActionOrder } from '../narration-action-order';

export abstract class NarrationAction {
  abstract get order(): NarrationActionOrder;

  abstract getName(): TranslatableText;

  abstract execute(narrationActionExecutionContext: NarrationActionExecutionContext): Narration | undefined;
}
