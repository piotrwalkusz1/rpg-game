import { ActionExecutingEvent } from 'engine/core/action';
import { ECSEvent, System } from 'engine/core/ecs';
import { PositionComponent } from 'engine/core/map/component/position-component';
import { MoveAction } from 'engine/modules/movement/move-action';

export class MovementSystem extends System {
  override async processEvent(event: ECSEvent): Promise<void> {
    if (event instanceof ActionExecutingEvent && event.action instanceof MoveAction) {
      const action: MoveAction = event.action;
      action.executor.getComponent(PositionComponent)?.setPosition(action.position);
    }
  }
}
