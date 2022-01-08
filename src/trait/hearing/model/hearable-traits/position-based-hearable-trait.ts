import type { Position } from '../../../../map/model/position';
import { HearableTrait } from '../hearable-trait';
import type { HearerTrait } from '../hearer-trait';
import { PositionBasedHearerTrait } from '../hearer-traits/position-based-hearer-trait';
import { HearingLevel } from '../hearing-level';
export class PositionBasedHearableTrait extends HearableTrait {
  readonly positionsProvider: () => Position[];

  constructor(positions: Position[] | (() => Position[])) {
    super();
    this.positionsProvider = Array.isArray(positions) ? () => positions : positions;
  }

  override getValue(hearer: HearerTrait): HearingLevel {
    return hearer instanceof PositionBasedHearerTrait &&
      this.positionsProvider().some((position) => hearer.isSoundHearableFromPosition(position))
      ? HearingLevel.TALK
      : HearingLevel.NONE;
  }
}
