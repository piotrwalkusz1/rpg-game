import type { Position } from '../../map/model/position';

export interface DetectableEvent {
  get detectablePositions(): Position[];
}
