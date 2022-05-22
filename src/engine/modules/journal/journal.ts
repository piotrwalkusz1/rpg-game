import type { JournalEntry } from './journal-entry';

export type JournalSubscriber = (entry: JournalEntry) => void;

export class Journal {
  private readonly _entries: JournalEntry[] = [];

  addEntry(entry: JournalEntry): void {
    this._entries.push(entry);
    this._entries.sort((firstEntry, secondEntry) => {
      if (firstEntry.time > secondEntry.time) {
        return 1;
      } else if (firstEntry.time < secondEntry.time) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  get unreadEntries(): JournalEntry[] {
    return this._entries.filter((entry) => entry.state !== 'READ');
  }
}
