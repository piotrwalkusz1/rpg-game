import type { Bookmark } from './bookmark';
import type { BookmarkProvider, BookmarkProviderParams } from './bookmark-provider';

export class BookmarkService {
  constructor(private providers: BookmarkProvider[]) {}

  getBookmarks(params: BookmarkProviderParams): Bookmark[] {
    return this.providers.flatMap((provider) => provider.getBookmarks(params));
  }
}
