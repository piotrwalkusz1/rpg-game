import { Component } from 'engine/core/ecs';
import { Journal } from './journal';

export class JournalOwner extends Component {
  readonly journal: Journal = new Journal();
}
