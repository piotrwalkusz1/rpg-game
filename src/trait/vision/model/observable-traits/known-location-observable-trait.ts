import { ObservableTrait } from '../observable-trait';
import type { ObservatorTrait } from '../observator-trait';
import { KnownLocationObservatorTrait } from '../observator-traits/known-location-observator-trait';
import { VisibilityLevel } from '../visibility-level';

export class KnownLocationObservableTrait extends ObservableTrait {
  override getValue(observator: ObservatorTrait): VisibilityLevel {
    return observator instanceof KnownLocationObservatorTrait && observator.knownLocations.includes(this)
      ? VisibilityLevel.LOCATABLE
      : VisibilityLevel.NONE;
  }
}
