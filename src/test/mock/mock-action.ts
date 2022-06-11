import { Action } from 'engine/core/action';
import type { Condition } from 'engine/core/ecs';

export class MockAction extends Action {
  static readonly DEFAULT_DURATION = { seconds: 1 };

  private readonly conditions: Condition[];
  private readonly _duration: Duration;

  constructor(params?: { condition?: Condition; duration?: Duration }) {
    super();
    this.conditions = params?.condition ? [params.condition] : [];
    this._duration = params?.duration || MockAction.DEFAULT_DURATION;
  }

  override get duration(): Duration {
    return this._duration;
  }

  override getExecutionConditions(): Condition[] {
    return this.conditions;
  }
}
