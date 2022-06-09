import { ECSEvent, System } from '../ecs';
import type { GameEngine } from './game-engine';

export abstract class GameSystem extends System {
  abstract processEvent(event: ECSEvent, engine: GameEngine): Promise<void>;
}
