import { GameEngine } from 'engine/core/game';
import { Bookmark, BookmarkProvider, BookmarkProviderParams, BookmarkService } from 'frontend/bookmark';
import { It, Mock, Times } from 'moq.ts';

describe('Bookmark service', () => {
  describe('generateBookmarks', () => {
    it('should return all bookmarks from all providers', () => {
      const engine = new GameEngine();
      const bookmarks = [new Mock<Bookmark>().object(), new Mock<Bookmark>().object(), new Mock<Bookmark>().object()];
      const bookmarkProvidersMocks = [
        new Mock<BookmarkProvider>().setup((instance) => instance.getBookmarks(It.IsAny())).returns([bookmarks[0], bookmarks[1]]),
        new Mock<BookmarkProvider>().setup((instance) => instance.getBookmarks(It.IsAny())).returns([bookmarks[2]])
      ];
      const bookmarkProviders = bookmarkProvidersMocks.map((mock) => mock.object());
      const bookmarkService = new BookmarkService(bookmarkProviders);

      const result = bookmarkService.getBookmarks({ engine });

      expect(result).toEqual(bookmarks);
      bookmarkProvidersMocks[0].verify(
        (instance) => instance.getBookmarks(It.Is((params: BookmarkProviderParams) => params.engine === engine)),
        Times.Once()
      );
      bookmarkProvidersMocks[1].verify(
        (instance) => instance.getBookmarks(It.Is((params: BookmarkProviderParams) => params.engine === engine)),
        Times.Once()
      );
    });
  });
});
