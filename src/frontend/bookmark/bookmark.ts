import type { Image } from 'engine/core/resources';
import type { BookmarkContext } from './bookmark-context';

export type BookmarkBackground = 'YELLOW' | 'RED';

export abstract class Bookmark {
  abstract get context(): BookmarkContext;

  abstract get background(): BookmarkBackground;

  abstract get image(): Image;
}
