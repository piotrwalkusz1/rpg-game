import { PositionSet } from '../../../../core/map/model/position-set';
import { ObservableTrait } from '../observable-trait';
import type { ObservatorTrait } from '../observator-trait';
import { PositionBasedObservatorTrait } from '../observator-traits/position-based-observator-trait';
import { VisibilityLevel } from '../visibility-level';

export class PositionBasedObservableTrait extends ObservableTrait {
  readonly positionSetProvider: () => PositionSet;

  constructor(positionSet: PositionSet | (() => PositionSet)) {
    super();
    this.positionSetProvider = typeof positionSet === 'object' ? () => positionSet : positionSet;
  }

  override getValue(observator: ObservatorTrait): VisibilityLevel {
    return observator instanceof PositionBasedObservatorTrait &&
      PositionSet.areOverlapping(this.positionSetProvider(), observator.positionSetProvider())
      ? VisibilityLevel.VISIBLE
      : VisibilityLevel.NONE;
  }
}
