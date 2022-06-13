import { Character } from 'engine/modules/character';
import { Journal } from 'engine/modules/journal';
import { SpeakJournalEntry } from 'engine/modules/journal-extensions/journal-speaking';
import { Bookmark, BookmarkService } from 'frontend/bookmark';
import { SpeechBookmark } from 'frontend/bookmark/bookmarks/speech-bookmark';
import { Dialog, DialogSpeech } from 'frontend/dialog';
import { GameBuilder } from 'game';

describe('Bookmark service', () => {
  describe('generateBookmarks', () => {
    it('should return SpeechBookmark for each character with unread SpeakJournalEntry', () => {
      const engine = new GameBuilder().build();
      const character = Character.create(engine);
      const character2 = Character.create(engine);
      const journal = new Journal();
      journal.addEntry(
        new SpeakJournalEntry({ content: { literal: 'Hi.' }, quote: true, speaker: character, time: new Date(1000), state: 'READ' })
      );
      journal.addEntry(
        new SpeakJournalEntry({
          content: { literal: 'Are you listening?' },
          quote: true,
          speaker: character,
          time: new Date(2000),
          state: 'SEEN'
        })
      );
      journal.addEntry(
        new SpeakJournalEntry({
          content: { literal: 'He asks you about something.' },
          quote: false,
          speaker: character,
          time: new Date(3000),
          state: 'UNSEEN'
        })
      );
      journal.addEntry(
        new SpeakJournalEntry({
          content: { literal: 'Hello.' },
          quote: true,
          speaker: character2,
          time: new Date(4000)
        })
      );

      const bookmarks = BookmarkService.generateBookmarks({ journal, refreshEngine: () => {} });

      expect(bookmarks.length).toBe(2);
      expect(dialog(bookmarks[0]).character).toBe(character);
      expect(dialog(bookmarks[0]).speeches).toEqual([
        new DialogSpeech({ character: character, content: [{ literal: '"' }, { literal: 'Are you listening?' }, { literal: '"' }] }),
        new DialogSpeech({ character: character, content: { literal: 'He asks you about something.' } })
      ]);
      expect(dialog(bookmarks[1]).character).toBe(character2);
      expect(dialog(bookmarks[1]).speeches).toEqual([
        new DialogSpeech({ character: character2, content: [{ literal: '"' }, { literal: 'Hello.' }, { literal: '"' }] })
      ]);
    });

    it('should mark journal entries as read after dialog is closed', () => {
      const engine = new GameBuilder().build();
      const character = Character.create(engine);
      const journal = new Journal();
      journal.addEntry(
        new SpeakJournalEntry({ content: { literal: 'Hi.' }, quote: true, speaker: character, time: new Date(1000), state: 'SEEN' })
      );

      const bookmarks = BookmarkService.generateBookmarks({ journal, refreshEngine: () => {} });
      (bookmarks[0] as SpeechBookmark).dialog.onClose?.();

      expect(journal.entries).toEqual([
        new SpeakJournalEntry({ content: { literal: 'Hi.' }, quote: true, speaker: character, time: new Date(1000), state: 'READ' })
      ]);
    });

    function dialog(bookmark: Bookmark): Dialog {
      if (bookmark instanceof SpeechBookmark) {
        return bookmark.dialog;
      }
      throw new Error('Expected SpeechBookmark');
    }
  });
});
