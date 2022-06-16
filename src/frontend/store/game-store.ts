import type { Field } from 'engine/core/field';
import type { GameEngine } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import type { Bookmark, BookmarkContext, BookmarkService } from 'frontend/bookmark';
import type { Narration, NarrationContext, NarrationService } from 'frontend/narration';
import { getPlayer, Player } from 'game';
import { derived, get, Readable, writable, Writable } from 'svelte/store';

export class GameStore {
  readonly engine: Writable<GameEngine>;
  readonly blockedScreen: Writable<boolean>;
  readonly displayedLocation: Writable<Field>;
  readonly selectedField: Writable<Field | undefined>;
  readonly narrationContext: Writable<NarrationContext | undefined>;
  readonly activatedBookmarkContext: Writable<BookmarkContext | undefined>;
  readonly narration: Readable<Narration | undefined>;
  readonly bookmarks: Readable<Bookmark[]>;
  readonly activatedBookmark: Readable<Bookmark | undefined>;
  readonly player: Readable<Player>;

  constructor(private bookmarkService: BookmarkService, private narrationService: NarrationService, engine: GameEngine) {
    this.engine = writable(engine);
    this.blockedScreen = writable(false);
    this.displayedLocation = writable(getPlayer(get(this.engine)).field?.parentField);
    this.selectedField = writable(undefined);
    this.narrationContext = writable(undefined);
    this.activatedBookmarkContext = writable(undefined);
    this.narration = derived([this.narrationContext, this.engine], ([$narrationContext, $engine]) =>
      $narrationContext ? this.narrationService.getNarration({ context: $narrationContext, engine: $engine }) : undefined
    );
    this.bookmarks = derived(this.engine, ($engine) => this.bookmarkService.getBookmarks({ engine: $engine }));
    this.activatedBookmark = derived([this.bookmarks, this.activatedBookmarkContext], ([$bookmarks, $activatedBookmarkContext]) =>
      $activatedBookmarkContext ? $bookmarks.find((bookmark) => $activatedBookmarkContext.equals(bookmark.context)) : undefined
    );
    this.player = derived(this.engine, ($engine) => getPlayer($engine));
  }

  getEngine(): GameEngine {
    return get(this.engine);
  }

  refreshEngine(): void {
    this.engine.update((engine) => engine);
  }

  getPlayer(): Player {
    return get(this.player);
  }

  getTime(): Time {
    return this.getEngine().time;
  }
}
