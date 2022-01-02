import type { ActionExecutionContext } from '../../action/model/action-execution-context';
import type { MapLocation } from '../../map/model/map-location';
import type { Narration } from './narration';

export interface NarrationActionExecutionContext extends ActionExecutionContext {
  readonly changeLocationView: (location: MapLocation) => void;
  readonly getNarration: () => Narration | undefined;
}
