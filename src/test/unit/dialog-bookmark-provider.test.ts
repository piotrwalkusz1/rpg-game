import { CDIContainer } from 'cdi-container';
import { Character } from 'engine/modules/character';
import { SpeakJournalEntry } from 'engine/modules/journal-extensions/journal-speaking';
import { DialogBookmarkProvider } from 'frontend/bookmark/bookmark-providers/dialog-bookmark-provider';
import { DialogBookmark } from 'frontend/bookmark/bookmarks/dialog-bookmark';
import { GameBuilder, getPlayer } from 'game';

describe('DialogBookmarkProvider', () => {
  let dialogBookmarkProvider: DialogBookmarkProvider;

  beforeEach(() => {
    dialogBookmarkProvider = new DialogBookmarkProvider();
  });

  describe('getBookmarks', () => {
    it('should return SpeechBookmark for each character with unread SpeakJournalEntry', () => {
      const engine = CDIContainer.create().get(GameBuilder).build();
      const character = Character.create(engine);
      const character2 = Character.create(engine);
      const journalEntry = new SpeakJournalEntry({
        content: { literal: 'Hi.' },
        quote: true,
        speaker: character,
        time: new Date(1000),
        state: 'READ'
      });
      const journalEntry2 = new SpeakJournalEntry({
        content: { literal: 'Are you listening?' },
        quote: true,
        speaker: character,
        time: new Date(2000),
        state: 'SEEN'
      });
      const journalEntry3 = new SpeakJournalEntry({
        content: { literal: 'He asks you about something.' },
        quote: false,
        speaker: character,
        time: new Date(3000),
        state: 'UNSEEN'
      });
      const journalEntry4 = new SpeakJournalEntry({
        content: { literal: 'Hello.' },
        quote: true,
        speaker: character2,
        time: new Date(4000)
      });
      const journal = getPlayer(engine).journal;
      journal.addEntry(journalEntry);
      journal.addEntry(journalEntry2);
      journal.addEntry(journalEntry3);
      journal.addEntry(journalEntry4);

      const bookmarks = dialogBookmarkProvider.getBookmarks({ engine });

      expect(bookmarks).toEqual([
        new DialogBookmark({ character: character, journalEntries: [journalEntry2, journalEntry3] }),
        new DialogBookmark({ character: character2, journalEntries: [journalEntry4] })
      ]);
    });
  });
});
