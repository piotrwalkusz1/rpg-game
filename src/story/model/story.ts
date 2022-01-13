import type { GameState } from '../../game/model/game-state';

export abstract class Story {
  abstract initialize(gameState: GameState): void;
}
