import type { GameState } from '../../game/model/game-state';
import type { NarrationAction } from '../../narration/model/narration-actions/narration-action';

export abstract class Story {
  abstract getNarrationActions(gameState: GameState): NarrationAction[];
}
