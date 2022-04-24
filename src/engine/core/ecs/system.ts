import type { ECSEvent, Engine } from '.';

export abstract class System {
  abstract processEvent(event: ECSEvent, engine: Engine): Promise<void>;
}
