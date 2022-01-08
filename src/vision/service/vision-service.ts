import type { ObservableObject } from '../model/observable-object';
import type { Observator } from '../model/observator';
import { VisibilityLevel } from '../model/visibility-level';

export namespace VisionService {
  export const isVisible = (observable: ObservableObject, observator: Observator): boolean => {
    return getVisibilityLevel(observable, observator) >= VisibilityLevel.VISIBLE;
  };

  export const getVisibilityLevel = (observable: ObservableObject, observator: Observator): VisibilityLevel => {
    const visibilityLevels = observable.observableTraits.flatMap((observableTrait) =>
      observator.observatorTraits.map((observatorTrait) => observableTrait.getVisibilityLevel(observatorTrait))
    );
    return Math.max(VisibilityLevel.NONE, ...visibilityLevels);
  };
}
