import { addMilliseconds } from 'date-fns';
import { Journal, JournalEntry } from 'engine/modules/journal';

describe('Journal', () => {
  class MockJournalEntry extends JournalEntry {}

  describe('addEntry', () => {
    it('should sort entry after each add', () => {
      const time = new Date(10000);
      const entry = new MockJournalEntry({ time });
      const entry2 = new MockJournalEntry({ time: addMilliseconds(time, 100) });
      const entry3 = new MockJournalEntry({ time: addMilliseconds(time, 50) });
      const entry4 = new MockJournalEntry({ time: addMilliseconds(time, -10) });
      const entry5 = new MockJournalEntry({ time: addMilliseconds(time, -10) });
      const journal = new Journal();

      journal.addEntry(entry);
      journal.addEntry(entry2);
      journal.addEntry(entry3);
      journal.addEntry(entry4);
      journal.addEntry(entry5);

      expect(journal.entries).toEqual([entry4, entry5, entry, entry3, entry2]);
    });
  });
});
