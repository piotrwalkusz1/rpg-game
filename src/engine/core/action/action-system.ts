import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { ActionExecutedEvent, ActionExecutingEvent, ActionService, BeforeActionExecutingEvent } from '.';

export class ActionSystem extends System {
  async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof BeforeActionExecutingEvent) {
      await this.processBeforeActionExecutingEvent(event, engine);
    }
  }

  private async processBeforeActionExecutingEvent({ time, action, executor }: BeforeActionExecutingEvent, engine: Engine): Promise<void> {
    if (executor.pendingAction?.action !== action || !ActionService.canExecuteAction(action, executor, engine)) {
      return;
    }
    engine.getComponent(GameEventQueue)?.addEvent(new ActionExecutingEvent({ time, action, executor }));
    engine.getComponent(GameEventQueue)?.addEvent(new ActionExecutedEvent({ time, action, executor }));
    executor.pendingAction = undefined;
  }
}
