import { Action, ActionExecutor } from 'engine/core/action';
import { Condition, Entity, EntityProvider } from 'engine/core/ecs';
import { IsAlive } from 'engine/modules/health';
import type { TranslatableText } from 'i18n/translatable-text';

export class SpeakAction extends Action {
  readonly receivers: Entity[];
  readonly content: TranslatableText;
  readonly quote: boolean;

  constructor({ receivers, content, quote }: { receivers: EntityProvider[]; content: TranslatableText; quote: boolean }) {
    super();
    this.receivers = EntityProvider.getEntities(receivers);
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
