import type { GameEngine } from 'engine/core/game';
import type { BookmarkService } from 'frontend/bookmark';
import type { NarrationService } from 'frontend/narration';
import { GameStore } from './game-store';

export class GameStoreService {
  constructor(private bookmarkService: BookmarkService, private narrationService: NarrationService) {}

  createStore({ engine }: { engine: GameEngine }): GameStore {
    return new GameStore(this.bookmarkService, this.narrationService, engine);
  }
}
