import { ECSEvent } from 'engine/core/ecs';

export abstract class TimeEvent extends ECSEvent {
  readonly time: Date;

  constructor({ time }: { time: Date }) {
    super();
    this.time = time;
  }
}
