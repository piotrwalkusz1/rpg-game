import { GameEvent } from '../game';
import type { Activity } from './activity';

export class ActivityEvent extends GameEvent {
  readonly activity: Activity;

  constructor({ time, activity }: { time: Date; activity: Activity }) {
    super({ time });
    this.activity = activity;
  }
}

export class ActivityStartedEvent extends ActivityEvent {}

export class ActivityEndScheduledEvent extends ActivityEvent {}

export class ActivityEndedEvent extends ActivityEvent {}
