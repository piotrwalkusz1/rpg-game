import { GameEngine } from 'engine/core/game';
import { Bookmark, BookmarkProvider, BookmarkService } from 'frontend/bookmark';
import { Mock, Times } from 'typemoq';

describe('Bookmark service', () => {
  describe('generateBookmarks', () => {
    it('should return all bookmarks from all providers', () => {
      const engine = new GameEngine();
      const bookmarks = [Mock.ofType<Bookmark>().object, Mock.ofType<Bookmark>().object, Mock.ofType<Bookmark>().object];
      const bookmarkProvidersMocks = [Mock.ofType<BookmarkProvider>(), Mock.ofType<BookmarkProvider>()];
      bookmarkProvidersMocks[0]
        .setup((instance) => instance.getBookmarks({ engine }))
        .returns(() => [bookmarks[0], bookmarks[1]])
        .verifiable(Times.once());
      bookmarkProvidersMocks[1]
        .setup((instance) => instance.getBookmarks({ engine }))
        .returns(() => [bookmarks[2]])
        .verifiable(Times.once());
      const bookmarkProviders = bookmarkProvidersMocks.map((mock) => mock.object);
      const bookmarkService = new BookmarkService(bookmarkProviders);

      const result = bookmarkService.getBookmarks({ engine });

      expect(result).toEqual(bookmarks);
      bookmarkProvidersMocks[0].verifyAll();
      bookmarkProvidersMocks[1].verifyAll();
    });
  });
});
