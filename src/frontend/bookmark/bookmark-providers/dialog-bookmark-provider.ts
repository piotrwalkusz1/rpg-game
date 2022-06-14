import type { Character } from 'engine/modules/character';
import type { Journal } from 'engine/modules/journal';
import { CharacterJournalEntry } from 'engine/modules/journal-extensions/journal-character';
import { getPlayer } from 'game';
import { ArrayUtils } from 'utils';
import type { Bookmark } from '../bookmark';
import { BookmarkProvider, BookmarkProviderParams } from '../bookmark-provider';
import { DialogBookmark } from '../bookmarks/dialog-bookmark';

export class DialogBookmarkProvider extends BookmarkProvider {
  override getBookmarks({ engine }: BookmarkProviderParams): Bookmark[] {
    const entriesByCharacters = this.getUnreadEntriesGroupedByCharacters(getPlayer(engine).journal);
    return Array.from(entriesByCharacters).map(
      ([character, journalEntries]) =>
        new DialogBookmark({
          character,
          journalEntries
        })
    );
  }

  private getUnreadEntriesGroupedByCharacters(journal: Journal): Map<Character, CharacterJournalEntry[]> {
    const entriesByCharacters = new Map<Character, CharacterJournalEntry[]>();
    for (const entry of ArrayUtils.filterInstanceOf(journal.unreadEntries, CharacterJournalEntry)) {
      const entries = entriesByCharacters.get(entry.character);
      if (entries) {
        entries.push(entry);
      } else {
        entriesByCharacters.set(entry.character, [entry]);
      }
    }
    return entriesByCharacters;
  }
}
