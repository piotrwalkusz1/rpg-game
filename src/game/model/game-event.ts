import type { GameContext } from './game-context';
import type { GameEventHandleResult } from './game-event-handle-result';

export abstract class GameEvent {
  readonly time: Date;

  constructor({ time }: { time: Date }) {
    this.time = time;
  }

  abstract process(context: GameContext): GameEventHandleResult;
}
