import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { Action, ActionExecutedEvent, ActionExecutingEvent, ActionExecutor, ActionService, BeforeActionExecutingEvent } from '.';

export class ActionSystem extends System {
  async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof BeforeActionExecutingEvent) {
      await this.processBeforeActionExecutingEvent(event, engine);
    }
  }

  private async processBeforeActionExecutingEvent(event: BeforeActionExecutingEvent, engine: Engine): Promise<void> {
    const action: Action = event.action;
    const executor: ActionExecutor = action.executor;
    if (executor.pendingAction?.action !== action || !ActionService.canExecuteAction(action, engine)) {
      return;
    }
    const time: Date = event.time;
    engine.getComponent(GameEventQueue)?.addEvent(new ActionExecutingEvent({ action, time }));
    engine.getComponent(GameEventQueue)?.addEvent(new ActionExecutedEvent({ action, time }));
    executor.pendingAction = undefined;
  }
}
