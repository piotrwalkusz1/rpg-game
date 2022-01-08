import type { ObservatorTrait } from './observator-trait';
import type { VisibilityLevel } from './visibility-level';

export abstract class ObservableTrait {
  abstract getVisibilityLevel(observator: ObservatorTrait): VisibilityLevel;
}
