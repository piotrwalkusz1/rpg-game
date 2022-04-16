import type { Trait } from './trait';

export abstract class ActiveTrait<T extends Trait, V> {
  abstract getValue(trait: T): V;
}
