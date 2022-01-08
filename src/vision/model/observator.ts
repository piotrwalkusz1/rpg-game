import type { ObservatorTrait } from './observator-trait';

export interface Observator {
  get observatorTraits(): ObservatorTrait[];
}
