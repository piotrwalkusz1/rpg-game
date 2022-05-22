import { Component } from 'engine/core/ecs';
import type { GameEvent } from '.';

export class GameEventQueue extends Component {
  private readonly _events: GameEvent[] = [];

  get events(): readonly GameEvent[] {
    return this._events;
  }

  addEvents(events: GameEvent[]): void {
    events.forEach((event) => this.addEvent(event));
  }

  addEvent(event: GameEvent): void {
    this._events.push(event);
    this._events.sort(function (firstEvent, secondEvent) {
      if (firstEvent.time > secondEvent.time) {
        return 1;
      } else if (firstEvent.time < secondEvent.time) {
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
