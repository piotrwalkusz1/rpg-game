import type { GameContext } from '../../game/model/game-context';
import type { TimeEventHandleResult } from './time-event-handle-result';

export abstract class TimeEvent {
  readonly time: Date;

  constructor({ time }: { time: Date }) {
    this.time = time;
  }

  abstract handle(context: GameContext): TimeEventHandleResult;
}
