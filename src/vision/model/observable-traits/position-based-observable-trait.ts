import type { Position } from '../../../map/model/position';
import { ObservableTrait } from '../observable-trait';
import type { ObservatorTrait } from '../observator-trait';
import { PositionBasedObservatorTrait } from '../observator-traits/position-based-observator-trait';
import { VisibilityLevel } from '../visibility-level';

export class PositionBasedObservableTrait extends ObservableTrait {
  readonly positionsProvider: () => Position[];

  constructor(positions: Position[] | (() => Position[])) {
    super();
    this.positionsProvider = Array.isArray(positions) ? () => positions : positions;
  }

  override getVisibilityLevel(observator: ObservatorTrait): VisibilityLevel {
    return observator instanceof PositionBasedObservatorTrait &&
      this.positionsProvider().some((position) => observator.isPositionVisible(position))
      ? VisibilityLevel.VISIBLE
      : VisibilityLevel.NONE;
  }
}
