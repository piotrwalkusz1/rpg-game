import { Action } from 'engine/core/action';
import type { Condition } from 'engine/core/ecs';

export class MockAction extends Action {
  override get duration(): Duration {
    return { seconds: 0 };
  }

  override getExecutionConditions(): Condition[] {
    return [];
  }
}
