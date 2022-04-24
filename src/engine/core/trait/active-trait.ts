import type { Trait } from 'engine/core/trait';

export abstract class ActiveTrait<T extends Trait, V> {
  abstract getValue(trait: T): V;
}
