import type { Battle } from '../../battle/model/battle';
import type { Character } from '../../character/model/character';
import type { GameState } from '../../game/model/game-state';
import type { Position } from '../../map/model/position';
import type { TraitOwner } from '../../trait/model/trait-owner';

export interface ActionExecutionContext {
  readonly changePlayerPosition: (position: Position) => void;
  readonly getGameState: () => GameState;
  readonly startBattle: (battle: Battle) => void;
  readonly addKnownLocation: (chracter: Character, location: TraitOwner) => void;
}
