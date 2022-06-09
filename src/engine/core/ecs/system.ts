import type { ECSEvent } from './ecs-event';
import type { Engine } from './engine';

export abstract class System {
  abstract processEvent(event: ECSEvent, engine: Engine): Promise<void>;
}
