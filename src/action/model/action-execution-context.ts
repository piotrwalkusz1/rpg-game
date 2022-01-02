import type { GameState } from '../../game/model/game-state';
import type { Position } from '../../map/model/position';

export interface ActionExecutionContext {
  readonly changePlayerPosition: (position: Position) => void;
  readonly gameState: GameState;
}
