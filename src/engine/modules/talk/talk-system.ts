import { ECSEvent, Engine, System } from 'engine/core/ecs';

export class TalkSystem extends System {
  override processEvent(_event: ECSEvent, _engine: Engine): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
