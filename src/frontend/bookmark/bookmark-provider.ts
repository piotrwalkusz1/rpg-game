import type { GameEngine } from 'engine/core/game';
import type { Bookmark } from './bookmark';

export type BookmarkProviderParams = { engine: GameEngine };

export abstract class BookmarkProvider {
  abstract getBookmarks(params: BookmarkProviderParams): Bookmark[];
}
