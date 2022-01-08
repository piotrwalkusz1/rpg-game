import type { ObservableTrait } from './observable-trait';

export interface ObservableObject {
  get observableTraits(): ObservableTrait[];
}
