import { ActionExecutedEvent } from 'engine/core/action';
import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { AIService } from '.';

export class AISystem extends System {
  async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof ActionExecutedEvent && event.executor.entity) {
      AIService.executeTurn(event.executor.entity, engine);
    }
  }
}
