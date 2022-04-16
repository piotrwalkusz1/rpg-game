import type { GameEvent } from './game-event';

export class GameEventQueue {
  private readonly _events: GameEvent[] = [];

  addEvent(event: GameEvent): void {
    this._events.push(event);
    this._events.sort(function (firstEvent, secondEvent) {
      if (firstEvent > secondEvent) {
        return 1;
      } else if (firstEvent < secondEvent) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  popNextEvent(): GameEvent | undefined {
    return this._events.shift();
  }
}
