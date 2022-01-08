import { VisibilityLevel } from '../model/visibility-level';
import type { TraitOwner } from '../../model/trait-owner';
import { TraitService } from '../../service/trait-service';
import { ObservableTrait } from '../model/observable-trait';
import { ObservatorTrait } from '../model/observator-trait';

export namespace VisionService {
  export const isVisible = (observable: TraitOwner, observator: TraitOwner): boolean => {
    return getVisibilityLevel(observable, observator) >= VisibilityLevel.VISIBLE;
  };

  export const getVisibilityLevel = (observable: TraitOwner, observator: TraitOwner): VisibilityLevel => {
    return TraitService.resolveTraits(observable, observator, ObservableTrait, ObservatorTrait, (visibilityLevels) =>
      Math.max(VisibilityLevel.NONE, ...visibilityLevels)
    );
  };
}
