import { ObservableTrait } from 'engine/modules/vision/observable-trait';
import type { VisibilityLevel } from 'engine/modules/vision/visibility-level';

export class ConstantObservableTrait extends ObservableTrait {
  constructor(readonly visibilityLevel: VisibilityLevel) {
    super();
  }

  override getValue(): VisibilityLevel {
    return this.visibilityLevel;
  }
}
