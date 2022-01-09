import type { TraitOwner } from '../../model/trait-owner';
import { TraitService } from '../../service/trait-service';
import { ObservableTrait } from '../model/observable-trait';
import { KnownLocationObservableTrait } from '../model/observable-traits/known-location-observable-trait';
import { ObservatorTrait } from '../model/observator-trait';
import { KnownLocationObservatorTrait } from '../model/observator-traits/known-location-observator-trait';
import { VisibilityLevel } from '../model/visibility-level';

export namespace VisionService {
  export const isVisible = (observable: TraitOwner, observator: TraitOwner): boolean => {
    return getVisibilityLevel(observable, observator) >= VisibilityLevel.VISIBLE;
  };

  export const isLocatable = (observable: TraitOwner, observator: TraitOwner): boolean => {
    return getVisibilityLevel(observable, observator) >= VisibilityLevel.LOCATABLE;
  };

  export const getVisibilityLevel = (observable: TraitOwner, observator: TraitOwner): VisibilityLevel => {
    return TraitService.resolveTraits(observable, observator, ObservableTrait, ObservatorTrait, (visibilityLevels) =>
      Math.max(VisibilityLevel.NONE, ...visibilityLevels)
    );
  };

  export const addKnownLocation = (observator: TraitOwner, observable: TraitOwner): void => {
    const knownLocalizationObservatorTrait = TraitService.getTrait(observator, KnownLocationObservatorTrait);
    const knownLocalizationObservableTrait = TraitService.getTrait(observable, KnownLocationObservableTrait);
    if (knownLocalizationObservatorTrait && knownLocalizationObservableTrait) {
      knownLocalizationObservatorTrait.knownLocations.push(knownLocalizationObservableTrait);
    }
  };
}
