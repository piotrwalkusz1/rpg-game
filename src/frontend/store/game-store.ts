import type { Field } from 'engine/core/field';
import type { GameEngine } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import type { Journal } from 'engine/modules/journal';
import type { Bookmark, BookmarkContext } from 'frontend/bookmark';
import type { Narration, NarrationContext } from 'frontend/narration';
import type { Player } from 'game';
import type { Readable, Writable } from 'svelte/store';

export interface GameStore {
  readonly engine: Writable<GameEngine>;
  readonly blockedScreen: Writable<boolean>;
  readonly displayedLocation: Writable<Field>;
  readonly selectedField: Writable<Field | undefined>;
  readonly narrationContext: Writable<NarrationContext | undefined>;
  readonly activatedBookmarkContext: Writable<BookmarkContext | undefined>;
  readonly narration: Readable<Narration | undefined>;
  readonly bookmarks: Readable<Bookmark[]>;
  readonly activatedBookmark: Readable<Bookmark | undefined>;
  readonly time: Readable<Time>;
  readonly player: Readable<Player>;
  readonly journal: Readable<Journal>;
}
