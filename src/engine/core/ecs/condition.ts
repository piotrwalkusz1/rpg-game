import type { Engine } from './engine';

export interface Condition {
  check(engine: Engine): boolean;
}
