import { ObservableTrait } from '../observable-trait';
import type { ObservatorTrait } from '../observator-trait';
import { KnownLocalizationObservatorTrait } from '../observator-traits/known-localization-observator-trait';
import { VisibilityLevel } from '../visibility-level';

export class KnownLocalizationObservableTrait extends ObservableTrait {
  override getValue(observator: ObservatorTrait): VisibilityLevel {
    return observator instanceof KnownLocalizationObservatorTrait && observator.knownLocations.includes(this)
      ? VisibilityLevel.LOCALIZABLE
      : VisibilityLevel.NONE;
  }
}
