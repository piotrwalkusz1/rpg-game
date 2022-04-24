import type { ECSEvent } from 'engine/core/ecs';

export abstract class TimeEvent implements ECSEvent {
  readonly time: Date;

  constructor({ time }: { time: Date }) {
    this.time = time;
  }
}
