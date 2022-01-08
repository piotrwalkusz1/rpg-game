import type { PositionPredicate } from '../../../map/model/position-predicate';
import { ObservatorTrait } from '../observator-trait';

export class PositionBasedObservatorTrait extends ObservatorTrait {
  constructor(readonly isPositionVisible: PositionPredicate) {
    super();
  }
}
