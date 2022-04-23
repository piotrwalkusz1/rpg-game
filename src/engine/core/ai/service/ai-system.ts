import { ActionExecutedEvent } from 'engine/core/action';
import { AIService } from 'engine/core/ai/service/ai-service';
import { ECSEvent, Engine, System } from 'engine/core/ecs';

export class AISystem extends System {
  async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof ActionExecutedEvent && event.executor.entity) {
      AIService.executeTurn(event.executor.entity, engine);
    }
  }
}
