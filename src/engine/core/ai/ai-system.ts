import { ActionExecutedEvent } from 'engine/core/action';
import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { CommandEndedEvent } from '../command';
import { AIService } from './ai-service';

export class AISystem extends System {
  async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof ActionExecutedEvent || event instanceof CommandEndedEvent) {
      AIService.executeTurn(event.executor, engine);
    }
  }
}
