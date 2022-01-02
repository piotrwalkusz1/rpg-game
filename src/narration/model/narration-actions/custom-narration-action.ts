import type { TranslatableText } from '../../../i18n/translatable-text';
import type { Narration } from '../narration';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import { NarrationActionOrder } from '../narration-action-order';
import { NarrationAction } from './narration-action';

export class CustomNarrationAction extends NarrationAction {
  readonly name: TranslatableText;
  readonly nextNarration?: Narration;

  constructor({ name, nextNarration }: { name: TranslatableText; nextNarration?: Narration }) {
    super();
    this.name = name;
    this.nextNarration = nextNarration;
  }

  override get order(): NarrationActionOrder {
    return NarrationActionOrder.CUSTOM;
  }

  override getName(): TranslatableText {
    return this.name;
  }

  override execute(_narrationActionExecutionContext: NarrationActionExecutionContext): Narration | undefined {
    return this.nextNarration;
  }
}
