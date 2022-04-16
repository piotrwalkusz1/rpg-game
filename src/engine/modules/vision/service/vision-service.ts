import type { TraitOwner } from '../../../core/trait/model/trait-owner';
import { TraitService } from '../../../core/trait/service/trait-service';
import { ObservableTrait } from '../model/observable-trait';
import { ObservatorTrait } from '../model/observator-trait';
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
}
