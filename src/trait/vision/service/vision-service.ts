import type { TraitOwner } from '../../model/trait-owner';
import { TraitService } from '../../service/trait-service';
import { ObservableTrait } from '../model/observable-trait';
import { KnownLocalizationObservableTrait } from '../model/observable-traits/known-localization-observable-trait';
import { ObservatorTrait } from '../model/observator-trait';
import { KnownLocalizationObservatorTrait } from '../model/observator-traits/known-localization-observator-trait';
import { VisibilityLevel } from '../model/visibility-level';

export namespace VisionService {
  export const isVisible = (observable: TraitOwner, observator: TraitOwner): boolean => {
    return getVisibilityLevel(observable, observator) >= VisibilityLevel.VISIBLE;
  };

  export const isLocalizable = (observable: TraitOwner, observator: TraitOwner): boolean => {
    return getVisibilityLevel(observable, observator) >= VisibilityLevel.LOCALIZABLE;
  };

  export const getVisibilityLevel = (observable: TraitOwner, observator: TraitOwner): VisibilityLevel => {
    return TraitService.resolveTraits(observable, observator, ObservableTrait, ObservatorTrait, (visibilityLevels) =>
      Math.max(VisibilityLevel.NONE, ...visibilityLevels)
    );
  };

  export const addKnownLocalization = (observator: TraitOwner, observable: TraitOwner): void => {
    const knownLocalizationObservatorTrait = TraitService.getTrait(observator, KnownLocalizationObservatorTrait);
    const knownLocalizationObservableTrait = TraitService.getTrait(observable, KnownLocalizationObservableTrait);
    if (knownLocalizationObservatorTrait && knownLocalizationObservableTrait) {
      knownLocalizationObservatorTrait.knownLocations.push(knownLocalizationObservableTrait);
    }
  };
}
