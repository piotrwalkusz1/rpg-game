import type { MapLocation } from '../../map/model/map-location';
import type { Position } from '../../map/model/position';
import type { ActionContext } from './action-context';

export class ActionExecutionContext {
  readonly changeActionContext: (actionContext: ActionContext | undefined) => void;
  readonly go: (position: Position) => void;
  readonly changeCurrentLocationView: (location: MapLocation) => void;

  constructor({
    changeActionContext,
    go,
    changeCurrentLocationView
  }: {
    changeActionContext: (actionContext: ActionContext | undefined) => void;
    go: (position: Position) => void;
    changeCurrentLocationView: (location: MapLocation) => void;
  }) {
    this.changeActionContext = changeActionContext;
    this.go = go;
    this.changeCurrentLocationView = changeCurrentLocationView;
  }
}
