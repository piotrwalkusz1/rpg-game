import type { Position } from '../../../../map/model/position';
import { HearerTrait } from '../hearer-trait';

export class PositionBasedHearerTrait extends HearerTrait {
  constructor(readonly positionProvider: () => Position | undefined) {
    super();
  }
}
