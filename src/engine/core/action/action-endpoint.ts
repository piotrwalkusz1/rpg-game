import type { GameEngine } from '../game';
import type { Action } from './action';
import type { ActionExecutor } from './action-executor';
import { ActionService } from './action-service';

export class ActionEndpoint {
  static scheduleAction(action: Action, executor: ActionExecutor, engine: GameEngine): boolean {
    return ActionService.scheduleAction(action, executor, engine);
  }
}
