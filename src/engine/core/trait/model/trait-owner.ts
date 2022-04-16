import type { Trait } from './trait';

export interface TraitOwner {
  get traits(): Trait[];
}
