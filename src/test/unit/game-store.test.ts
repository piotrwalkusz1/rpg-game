import { GameEngine } from 'engine/core/game';
import { Bookmark, BookmarkContext, BookmarkService } from 'frontend/bookmark';
import type { Narration, NarrationContext, NarrationService } from 'frontend/narration';
import { GameStore } from 'frontend/store/game-store';
import { getPlayer, Player } from 'game';
import { get } from 'svelte/store';
import { IMock, It, Mock, Times } from 'typemoq';

describe('GameStore', () => {
  class MockBookmarkContext extends BookmarkContext {
    constructor(private id: number) {
      super();
    }

    override equals(bookmarkContext: BookmarkContext): boolean {
      return bookmarkContext instanceof MockBookmarkContext && this.id === bookmarkContext.id;
    }
  }

  let bookmarkServiceMock: IMock<BookmarkService>;
  let narrationServiceMock: IMock<NarrationService>;
  let engine: GameEngine;
  let store: GameStore;

  beforeEach(() => {
    bookmarkServiceMock = Mock.ofType<BookmarkService>();
    narrationServiceMock = Mock.ofType<NarrationService>();
    engine = new GameEngine();
    Player.create(engine);
    store = new GameStore(bookmarkServiceMock.object, narrationServiceMock.object, engine);
  });

  describe('narration', () => {
    it('should return undefined if narrationContext is undefined', () => {
      expect(get(store.narration)).toBeUndefined();
    });

    it('should return narration if narrationContext is set', () => {
      const narrationContext = Mock.ofType<NarrationContext>().object;
      const narration = Mock.ofType<Narration>().object;
      narrationServiceMock.setup((instance) => instance.getNarration(It.isAny())).returns(() => narration);
      store.narrationContext.set(narrationContext);

      const result = get(store.narration);

      expect(result).toBe(narration);
      narrationServiceMock.verify((instance) => instance.getNarration({ context: narrationContext, engine }), Times.once());
    });
  });

  describe('activatedBookmark', () => {
    it('should return undefined if activatedBookmarkContext is undefined', () => {
      bookmarkServiceMock.setup((instance) => instance.getBookmarks(It.isAny())).returns(() => []);

      expect(get(store.activatedBookmark)).toBeUndefined();
    });

    it('should return undefined if activatedBookmarkContext is set but matching bookmark not found', () => {
      const bookmarkMock = Mock.ofType<Bookmark>();
      bookmarkMock.setup((instance) => instance.context).returns(() => new MockBookmarkContext(1));
      bookmarkServiceMock
        .setup((instance) => instance.getBookmarks({ engine }))
        .returns(() => [bookmarkMock.object])
        .verifiable(Times.once());
      store.activatedBookmarkContext.set(new MockBookmarkContext(2));

      const result = get(store.activatedBookmark);

      expect(result).toBeUndefined();
      bookmarkServiceMock.verifyAll();
    });

    it('should return bookmark if activatedBookmarkContext is set and matching bookmark is found', () => {
      const bookmarkMock = Mock.ofType<Bookmark>();
      bookmarkMock.setup((instance) => instance.context).returns(() => new MockBookmarkContext(1));
      bookmarkServiceMock
        .setup((instance) => instance.getBookmarks({ engine }))
        .returns(() => [bookmarkMock.object])
        .verifiable(Times.once());
      store.activatedBookmarkContext.set(new MockBookmarkContext(1));

      const result = get(store.activatedBookmark);

      expect(result).toBe(bookmarkMock.object);
      bookmarkServiceMock.verifyAll();
    });
  });

  describe('player', () => {
    it('should return player', () => {
      expect(get(store.player)).toBe(getPlayer(engine));
    });
  });
});
