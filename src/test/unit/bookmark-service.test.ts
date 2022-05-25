import { Character } from 'engine/modules/character';
import { Journal } from 'engine/modules/journal';
import { SpeakJournalEntry } from 'engine/modules/journal-speaking';
import { Bookmark, BookmarkService } from 'frontend/bookmark';
import { SpeechBookmark } from 'frontend/bookmark/bookmarks/speech-bookmark';
import { Dialog, DialogSpeech } from 'frontend/dialog';
import { MockEngine } from 'test/mock/mock-engine';

describe('Bookmark service', () => {
  describe('generateBookmarks method', () => {
    it('should return SpeechBookmark for each character with unread SpeakJournalEntry', () => {
      const engine = new MockEngine();
      const firstCharacter = engine.addCharacter().requireComponent(Character);
      const secondCharacter = engine.addCharacter().requireComponent(Character);
      const journal = new Journal();
      journal.addEntry(
        new SpeakJournalEntry({ content: { literal: 'Hi.' }, quote: true, speaker: firstCharacter, time: new Date(1000), state: 'READ' })
      );
      journal.addEntry(
        new SpeakJournalEntry({
          content: { literal: 'Are you listening?' },
          quote: true,
          speaker: firstCharacter,
          time: new Date(2000),
          state: 'SEEN'
        })
      );
      journal.addEntry(
        new SpeakJournalEntry({
          content: { literal: 'He asks you about something.' },
          quote: false,
          speaker: firstCharacter,
          time: new Date(3000),
          state: 'UNSEEN'
        })
      );
      journal.addEntry(
        new SpeakJournalEntry({
          content: { literal: 'Hello.' },
          quote: true,
          speaker: secondCharacter,
          time: new Date(4000)
        })
      );

      const bookmarks = BookmarkService.generateBookmarks({ journal, refreshEngine: () => {} });

      expect(bookmarks.length).toBe(2);
      expect(dialog(bookmarks[0]).character).toBe(firstCharacter);
      expect(dialog(bookmarks[0]).speeches).toEqual([
        new DialogSpeech({ character: firstCharacter, content: { literal: 'Are you listening?' } }),
        new DialogSpeech({ character: firstCharacter, content: { literal: 'He asks you about something.' } })
      ]);
      expect(dialog(bookmarks[1]).character).toBe(secondCharacter);
      expect(dialog(bookmarks[1]).speeches).toEqual([new DialogSpeech({ character: secondCharacter, content: { literal: 'Hello.' } })]);
    });

    function dialog(bookmark: Bookmark): Dialog {
      if (bookmark instanceof SpeechBookmark) {
        return bookmark.dialog;
      }
      throw new Error('Expected SpeechBookmark');
    }
  });
});
