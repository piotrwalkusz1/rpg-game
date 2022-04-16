import type { Position } from '../../../../core/map/model/position';
import { HearerTrait } from '../hearer-trait';

export class PositionBasedHearerTrait extends HearerTrait {
  constructor(readonly positionProvider: () => Position | undefined) {
    super();
  }
}
