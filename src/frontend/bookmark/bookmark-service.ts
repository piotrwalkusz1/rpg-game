import type { Character } from 'engine/modules/character';
import type { Journal, JournalEntry } from 'engine/modules/journal';
import { CharacterJournalContext } from 'engine/modules/journal-extensions/journal-character';
import { Dialog, DialogSpeech } from 'frontend/dialog';
import { ArrayUtils } from 'utils';
import type { Bookmark } from './bookmark';
import { SpeechBookmark } from './bookmarks/speech-bookmark';

export class BookmarkService {
  static generateBookmarks({ journal, refreshEngine }: { journal: Journal; refreshEngine: () => void }): Bookmark[] {
    const entriesByCharacters = BookmarkService.getUnreadEntriesGroupedByCharacters(journal);
    return Array.from(entriesByCharacters).map(
      ([character, entries]) =>
        new SpeechBookmark({
          dialog: new Dialog({
            character,
            speeches: entries.map((entry) => new DialogSpeech({ character, content: entry.text })),
            onClose: () => {
              entries.forEach((entry) => (entry.state = 'READ'));
              refreshEngine();
            }
          })
        })
    );
  }

  private static getUnreadEntriesGroupedByCharacters(journal: Journal): Map<Character, JournalEntry[]> {
    const entriesByCharacters = new Map<Character, JournalEntry[]>();
    for (const entry of journal.unreadEntries) {
      const characters = ArrayUtils.filterInstanceOf(entry.contexts, CharacterJournalContext).map((context) => context.character);
      for (const character of characters) {
        const entries = entriesByCharacters.get(character);
        if (entries) {
          entries.push(entry);
        } else {
          entriesByCharacters.set(character, [entry]);
        }
      }
    }
    return entriesByCharacters;
  }
}
