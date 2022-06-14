import type { Character } from 'engine/modules/character';
import { BookmarkContext } from '../bookmark-context';

export class DialogBookmarkContext extends BookmarkContext {
  readonly character: Character;

  constructor(character: Character) {
    super();
    this.character = character;
  }

  override equals(bookmarkContext: BookmarkContext): boolean {
    return bookmarkContext instanceof DialogBookmarkContext && bookmarkContext.character === this.character;
  }
}
