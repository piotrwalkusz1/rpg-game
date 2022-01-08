import type { PositionPredicate } from '../../../../map/model/position-predicate';
import { HearerTrait } from '../hearer-trait';

export class PositionBasedHearerTrait extends HearerTrait {
  constructor(readonly isSoundHearableFromPosition: PositionPredicate) {
    super();
  }
}
