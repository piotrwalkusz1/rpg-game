import { ObservableTrait } from '../observable-trait';
import type { VisibilityLevel } from '../visibility-level';

export class ConstantObservableTrait extends ObservableTrait {
  constructor(readonly visibilityLevel: VisibilityLevel) {
    super();
  }

  override getValue(): VisibilityLevel {
    return this.visibilityLevel;
  }
}
