import type { Action } from 'engine/core/action';
import { GameContext, GameEvent } from 'engine/core/game';

export class ExecuteActionGameEvent extends GameEvent {
  readonly action: Action;

  constructor({ action, time, gameContext }: { action: Action; time: Date; gameContext: GameContext }) {
    super({ time, gameContext });
    this.action = action;
  }
}
