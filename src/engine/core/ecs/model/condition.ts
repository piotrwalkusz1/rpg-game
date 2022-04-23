import type { Engine } from 'engine/core/ecs';

export interface Condition {
  check(engine: Engine): boolean;
}
