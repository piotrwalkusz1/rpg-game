import { ActionExecutedEvent } from 'engine/core/action';
import type { ECSEvent } from 'engine/core/ecs';
import { CommandEndedEvent } from '../command';
import { GameEngine, GameSystem } from '../game';
import { AIService } from './ai-service';

export class AISystem extends GameSystem {
  async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof ActionExecutedEvent || event instanceof CommandEndedEvent) {
      AIService.executeTurn(event.executor, engine);
    }
  }
}
