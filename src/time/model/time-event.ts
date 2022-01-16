import type { WorldContext } from '../../game/model/world-context';
import type { TimeEventHandleResult } from './time-event-handle-result';

export abstract class TimeEvent {
  readonly time: Date;

  constructor({ time }: { time: Date }) {
    this.time = time;
  }

  abstract handle(context: WorldContext): TimeEventHandleResult;
}
