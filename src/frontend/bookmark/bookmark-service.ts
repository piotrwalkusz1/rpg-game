import type { Character } from 'engine/modules/character';
import type { Journal } from 'engine/modules/journal';
import { SpeakJournalEntry } from 'engine/modules/journal-extensions/journal-speaking';
import { Dialog, DialogSpeech } from 'frontend/dialog';
import { ArrayUtils } from 'utils';
import type { Bookmark } from './bookmark';
import { SpeechBookmark } from './bookmarks/speech-bookmark';

export namespace BookmarkService {
  export const generateBookmarks = ({ journal, refreshEngine }: { journal: Journal; refreshEngine: () => void }): Bookmark[] => {
    const entriesByCharacters = new Map<Character, SpeakJournalEntry[]>();
    for (const entry of ArrayUtils.filterInstanceOf(journal.unreadEntries, SpeakJournalEntry)) {
      const entries = entriesByCharacters.get(entry.speaker);
      if (entries) {
        entries.push(entry);
      } else {
        entriesByCharacters.set(entry.speaker, [entry]);
      }
    }

    const bookmarks: Bookmark[] = [];
    entriesByCharacters.forEach((entries, character) =>
      bookmarks.push(
        new SpeechBookmark({
          dialog: new Dialog({
            character,
            speeches: entries.map((entry) => new DialogSpeech({ character: entry.speaker, content: entry.content })),
            onClose: () => {
              entries.forEach((entry) => (entry.state = 'READ'));
              refreshEngine();
            }
          })
        })
      )
    );

    return bookmarks;
  };
}
