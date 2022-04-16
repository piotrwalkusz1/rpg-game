import type { ECSEvent } from 'engine/core/ecs';
import type { GameContext } from './game-context';

export abstract class GameEvent implements ECSEvent {
  readonly time: Date;
  readonly gameContext: GameContext;

  constructor({ time, gameContext }: { time: Date; gameContext: GameContext }) {
    this.time = time;
    this.gameContext = gameContext;
  }
}
