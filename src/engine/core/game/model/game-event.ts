import type { ECSEvent } from 'engine/core/ecs';

export abstract class GameEvent implements ECSEvent {
  readonly time: Date;

  constructor({ time }: { time: Date }) {
    this.time = time;
  }
}
