import type { Position } from '../../map/model/position';

export interface ActionExecutionContext {
  readonly changePlayerPosition: (position: Position) => void;
}
