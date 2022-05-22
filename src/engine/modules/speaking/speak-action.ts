import { Action, ActionExecutor } from 'engine/core/action';
import type { Condition, Entity } from 'engine/core/ecs';
import { IsAlive } from 'engine/modules/health';
import type { TranslatableText } from 'i18n/translatable-text';

export class SpeakAction extends Action {
  readonly receivers: Entity[];
  readonly content: TranslatableText;
  readonly quote: boolean;

  constructor({ receivers, content, quote }: { receivers: Entity[]; content: TranslatableText; quote: boolean }) {
    super();
    this.receivers = receivers;
    this.content = content;
    this.quote = quote;
  }

  override get duration(): Duration {
    return { seconds: 0 };
  }

  override getExecutionConditions(executor: ActionExecutor): Condition[] {
    return [new IsAlive(executor)];
  }
}
