import { TraitOwner, TraitService } from 'engine/core/trait';
import { ObservableTrait, ObservatorTrait, VisibilityLevel } from 'engine/modules/vision';

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
