import { ActiveTrait } from 'engine/core/trait';
import type { ObservatorTrait } from 'engine/modules/vision/observator-trait';
import type { VisibilityLevel } from 'engine/modules/vision/visibility-level';

export abstract class ObservableTrait extends ActiveTrait<ObservatorTrait, VisibilityLevel> {
  abstract getValue(observator: ObservatorTrait): VisibilityLevel;
}
