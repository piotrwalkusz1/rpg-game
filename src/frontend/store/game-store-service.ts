import type { GameEngine } from 'engine/core/game';
import type { BookmarkService } from 'frontend/bookmark';
import type { NarrationService } from 'frontend/narration';
import { getPlayer } from 'game';
import { derived, get, writable } from 'svelte/store';
import { GameStore } from './game-store';

export class GameStoreService {
  constructor(private bookmarkService: BookmarkService, private narrationService: NarrationService) {}

  createStore(params: { engine: GameEngine }): GameStore {
    const engine = writable(params.engine);
    const blockedScreen = writable(false);
    const displayedLocation = writable(getPlayer(get(engine)).field?.parentField);
    const selectedField = writable(undefined);
    const narrationContext = writable(undefined);
    const activatedBookmarkContext = writable(undefined);
    const narration = derived([narrationContext, engine], ([$narrationContext, $engine]) =>
      $narrationContext ? this.narrationService.getNarration({ context: $narrationContext, engine: $engine }) : undefined
    );
    const bookmarks = derived(engine, ($engine) => this.bookmarkService.getBookmarks({ engine: $engine }));
    const activatedBookmark = derived([bookmarks, activatedBookmarkContext], ([$bookmarks, $activatedBookmarkContext]) =>
      $activatedBookmarkContext ? $bookmarks.find((bookmark) => bookmark.context.equals($activatedBookmarkContext)) : undefined
    );
    const time = derived(engine, ($engine) => $engine.time);
    const player = derived(engine, ($engine) => getPlayer($engine));
    const journal = derived(player, ($player) => $player.journal);

    return new GameStore({
      engine,
      blockedScreen,
      displayedLocation,
      selectedField,
      narrationContext,
      activatedBookmarkContext,
      narration,
      bookmarks,
      activatedBookmark,
      time,
      player,
      journal
    });
  }
}
