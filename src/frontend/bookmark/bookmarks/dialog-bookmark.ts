import type { ImageUrl } from 'engine/core/resources';
import type { Character } from 'engine/modules/character';
import type { CharacterJournalEntry } from 'engine/modules/journal-extensions/journal-character';
import { Bookmark, BookmarkBackground } from '../bookmark';
import type { BookmarkContext } from '../bookmark-context';
import { DialogBookmarkContext } from '../bookmark-contexts/dialog-bookmark-context';

export class DialogBookmark extends Bookmark {
  readonly character: Character;
  readonly journalEntries: readonly CharacterJournalEntry[];

  constructor({ character, journalEntries }: { character: Character; journalEntries: CharacterJournalEntry[] }) {
    super();
    this.character = character;
    this.journalEntries = journalEntries;
  }

  override get context(): BookmarkContext {
    return new DialogBookmarkContext(this.character);
  }

  override get background(): BookmarkBackground {
    return 'YELLOW';
  }

  override get image(): ImageUrl {
    return '/images/ui/speech-bubble.png';
  }
}
