import type { KnownLocalizationObservableTrait } from '../observable-traits/known-localization-observable-trait';
import { ObservatorTrait } from '../observator-trait';

export class KnownLocalizationObservatorTrait extends ObservatorTrait {
  readonly knownLocations: KnownLocalizationObservableTrait[] = [];
}
