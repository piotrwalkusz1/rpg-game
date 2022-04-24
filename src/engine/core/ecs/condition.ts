import type { Engine } from '.';

export interface Condition {
  check(engine: Engine): boolean;
}
