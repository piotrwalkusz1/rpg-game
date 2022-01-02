import type { ActionExecutionContext } from '../../action/model/action-execution-context';
import type { MapLocation } from '../../map/model/map-location';

export interface NarrationActionExecutionContext extends ActionExecutionContext {
  readonly changeLocationView: (location: MapLocation) => void;
}
