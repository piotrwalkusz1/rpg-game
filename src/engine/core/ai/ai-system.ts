import { ActionExecutedEvent } from 'engine/core/action';
import type { ECSEvent } from 'engine/core/ecs';
import { CommandEndedEvent } from '../command';
import { GameEngine, GameSystem } from '../game';
import { AI } from './ai';
import { AIService } from './ai-service';

export class AISystem extends GameSystem {
  async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof ActionExecutedEvent || event instanceof CommandEndedEvent) {
      const ai = event.executor.getComponent(AI);
      if (ai) {
        AIService.executeTurn(ai, engine);
      }
    }
  }
}
