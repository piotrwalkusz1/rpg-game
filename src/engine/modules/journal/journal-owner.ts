import { Component } from 'engine/core/ecs';
import type { Journal } from './journal';

export class JournalOwner extends Component {
  readonly journal: Journal;

  constructor({ journal }: { journal: Journal }) {
    super();
    this.journal = journal;
  }
}
