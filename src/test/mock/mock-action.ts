import { Action } from 'engine/core/action';
import type { Condition } from 'engine/core/ecs';

export class MockAction extends Action {
  private readonly conditions: Condition[];

  constructor(params?: { condition?: Condition }) {
    super();
    this.conditions = params?.condition ? [params.condition] : [];
  }

  override get duration(): Duration {
    return { seconds: 0 };
  }

  override getExecutionConditions(): Condition[] {
    return this.conditions;
  }
}
