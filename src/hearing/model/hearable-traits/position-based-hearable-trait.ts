import type { PositionPredicate } from '../../../map/model/position-predicate';
import { HearableTrait } from '../hearable-trait';
import type { HearerTrait } from '../hearer-trait';
import { PositionBasedHearerTrait } from '../hearer-traits/position-based-hearer-trait';
import { HearingLevel } from '../hearing-level';

export class PositionBasedHearableTrait extends HearableTrait {
  constructor(readonly isHearable: PositionPredicate) {
    super();
  }

  override getValue(hearer: HearerTrait): HearingLevel {
    if (!(hearer instanceof PositionBasedHearerTrait)) {
      return HearingLevel.NONE;
    }
    const hearerPosition = hearer.positionProvider();
    return hearerPosition && this.isHearable(hearerPosition) ? HearingLevel.TALK : HearingLevel.NONE;
  }
}
