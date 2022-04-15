import type { PositionSet } from '../../../map/model/position-set';
import { ObservatorTrait } from '../observator-trait';

export class PositionBasedObservatorTrait extends ObservatorTrait {
  readonly positionSetProvider: () => PositionSet;

  constructor(positionSet: PositionSet | (() => PositionSet)) {
    super();
    this.positionSetProvider = typeof positionSet === 'object' ? () => positionSet : positionSet;
  }
}
