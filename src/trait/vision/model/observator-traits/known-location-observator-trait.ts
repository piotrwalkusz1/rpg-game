import type { KnownLocationObservableTrait } from '../observable-traits/known-location-observable-trait';
import { ObservatorTrait } from '../observator-trait';

export class KnownLocationObservatorTrait extends ObservatorTrait {
  readonly knownLocations: KnownLocationObservableTrait[] = [];
}
