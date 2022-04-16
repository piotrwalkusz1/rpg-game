import type { ECSEvent } from 'engine/core/ecs';

export abstract class System {
  abstract processEvent(event: ECSEvent): Promise<void>;
}
