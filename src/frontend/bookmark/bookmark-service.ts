import type { Bookmark } from './bookmark';
import type { BookmarkProvider, BookmarkProviderParams } from './bookmark-provider';
import { DialogBookmarkProvider } from './bookmark-providers/dialog-bookmark-provider';

export class BookmarkService {
  private static _providers: readonly BookmarkProvider[] = [new DialogBookmarkProvider()];

  static getBookmarks(params: BookmarkProviderParams): Bookmark[] {
    return this._providers.flatMap((provider) => provider.getBookmarks(params));
  }
}
