import { GameEngine } from 'engine/core/game';
import { Bookmark, BookmarkContext, BookmarkProviderParams, BookmarkService } from 'frontend/bookmark';
import type { Narration, NarrationContext, NarrationProviderParams, NarrationService } from 'frontend/narration';
import { GameStore } from 'frontend/store/game-store';
import { getPlayer, Player } from 'game';
import { It, Mock, Times } from 'moq.ts';
import { get } from 'svelte/store';

describe('GameStore', () => {
  class MockBookmarkContext extends BookmarkContext {
    constructor(private id: number) {
      super();
    }

    override equals(bookmarkContext: BookmarkContext): boolean {
      return bookmarkContext instanceof MockBookmarkContext && this.id === bookmarkContext.id;
    }
  }

  let bookmarkServiceMock: Mock<BookmarkService>;
  let narrationServiceMock: Mock<NarrationService>;
  let engine: GameEngine;
  let store: GameStore;

  beforeEach(() => {
    bookmarkServiceMock = new Mock<BookmarkService>();
    narrationServiceMock = new Mock<NarrationService>();
    engine = new GameEngine();
    Player.create(engine);
    store = new GameStore(bookmarkServiceMock.object(), narrationServiceMock.object(), engine);
  });

  describe('narration', () => {
    it('should return undefined if narrationContext is undefined', () => {
      expect(get(store.narration)).toBeUndefined();
    });

    it('should return narration if narrationContext is set', () => {
      const narrationContext = new Mock<NarrationContext>().object();
      const narration = new Mock<Narration>().object();
      narrationServiceMock.setup((instance) => instance.getNarration(It.IsAny())).returns(narration);
      store.narrationContext.set(narrationContext);

      const result = get(store.narration);

      expect(result).toBe(narration);
      narrationServiceMock.verify(
        (instance) =>
          instance.getNarration(
            It.Is((params: NarrationProviderParams) => params.engine === engine && params.context === narrationContext)
          ),
        Times.Once()
      );
    });
  });

  describe('activatedBookmark', () => {
    it('should return undefined if activatedBookmarkContext is undefined', () => {
      bookmarkServiceMock.setup((instance) => instance.getBookmarks(It.IsAny())).returns([]);

      expect(get(store.activatedBookmark)).toBeUndefined();
    });

    it('should return undefined if activatedBookmarkContext is set but matching bookmark not found', () => {
      const bookmark = new Mock<Bookmark>()
        .setup((instance) => instance.context)
        .returns(new MockBookmarkContext(1))
        .object();
      bookmarkServiceMock.setup((instance) => instance.getBookmarks(It.IsAny())).returns([bookmark]);
      store.activatedBookmarkContext.set(new MockBookmarkContext(2));

      const result = get(store.activatedBookmark);

      expect(result).toBeUndefined();
      bookmarkServiceMock.verify(
        (instance) => instance.getBookmarks(It.Is((params: BookmarkProviderParams) => params.engine === engine)),
        Times.Once()
      );
    });

    it('should return bookmark if activatedBookmarkContext is set and matching bookmark is found', () => {
      const bookmark = new Mock<Bookmark>()
        .setup((instance) => instance.context)
        .returns(new MockBookmarkContext(1))
        .object();
      bookmarkServiceMock.setup((instance) => instance.getBookmarks(It.IsAny())).returns([bookmark]);
      store.activatedBookmarkContext.set(new MockBookmarkContext(1));

      const result = get(store.activatedBookmark);

      expect(result).toBe(bookmark);
      bookmarkServiceMock.verify(
        (instance) => instance.getBookmarks(It.Is((params: BookmarkProviderParams) => params.engine === engine)),
        Times.Once()
      );
    });
  });

  describe('player', () => {
    it('should return player', () => {
      expect(get(store.player)).toBe(getPlayer(engine));
    });
  });
});
