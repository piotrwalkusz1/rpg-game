import type { BookmarkContext } from 'frontend/bookmark';
import { NarrationContext } from '../narration-context';

export class BookmarkNarrationContext extends NarrationContext {
  constructor(readonly bookmarkContext: BookmarkContext) {
    super();
  }
}
