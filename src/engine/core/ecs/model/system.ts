import type { ECSEvent, Engine } from 'engine/core/ecs';

export abstract class System {
  abstract processEvent(event: ECSEvent, engine: Engine): Promise<void>;
}
