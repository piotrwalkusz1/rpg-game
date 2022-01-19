import type { GameContext } from './game-context';

export abstract class GameEvent {
  readonly time: Date;

  constructor({ time }: { time: Date }) {
    this.time = time;
  }

  abstract process(context: GameContext): void;
}
