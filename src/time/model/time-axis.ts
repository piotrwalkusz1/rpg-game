import type { TimeEvent } from './time-event';

export class TimeAxis {
  private readonly _events: TimeEvent[] = [];

  addEvent(event: TimeEvent): void {
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

  popNextEvent(): TimeEvent | undefined {
    return this._events.shift();
  }
}
