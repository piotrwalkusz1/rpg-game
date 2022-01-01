import type { MapLocation } from '../../map/model/map-location';
import type { Position } from '../../map/model/position';

export class ActionExecutionContext {
  readonly go: (position: Position) => void;
  readonly changeCurrentLocationView: (location: MapLocation) => void;

  constructor({
    go,
    changeCurrentLocationView
  }: {
    go: (position: Position) => void;
    changeCurrentLocationView: (location: MapLocation) => void;
  }) {
    this.go = go;
    this.changeCurrentLocationView = changeCurrentLocationView;
  }
}
