import { ActiveTrait } from '../../trait/model/active-trait';
import type { ObservatorTrait } from './observator-trait';
import type { VisibilityLevel } from './visibility-level';

export abstract class ObservableTrait extends ActiveTrait<ObservatorTrait, VisibilityLevel> {
  abstract getValue(observator: ObservatorTrait): VisibilityLevel;
}
