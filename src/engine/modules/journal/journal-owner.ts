import { Component } from 'engine/core/ecs';
import { Journal } from './journal';
import type { JournalEntry } from './journal-entry';

export class JournalOwner extends Component {
  readonly journal: Journal = new Journal();

  addEntry(entry: JournalEntry): void {
    this.journal.addEntry(entry);
  }
}
