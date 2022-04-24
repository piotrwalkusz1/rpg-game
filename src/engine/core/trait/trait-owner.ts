import type { Trait } from 'engine/core/trait';

export interface TraitOwner {
  get traits(): Trait[];
}
