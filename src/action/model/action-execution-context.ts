import type { MapField } from '../../map/model/map-field';
import type { ActionContext } from './action-context';
import type { MapLocation } from '../../map/model/map-location';

export class ActionExecutionContext {
  readonly changeActionContext: (actionContext: ActionContext | undefined) => void;
  readonly go: (field: MapField) => void;
  readonly changeCurrentLocationView: (location: MapLocation) => void;

  constructor({
    changeActionContext,
    go,
    changeCurrentLocationView
  }: {
    changeActionContext: (actionContext: ActionContext | undefined) => void;
    go: (field: MapField) => void;
    changeCurrentLocationView: (location: MapLocation) => void;
  }) {
    this.changeActionContext = changeActionContext;
    this.go = go;
    this.changeCurrentLocationView = changeCurrentLocationView;
  }
}
