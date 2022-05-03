import { ActionExecutingEvent } from 'engine/core/action';
import { ECSEvent, System } from 'engine/core/ecs';
import { FieldUtils } from 'engine/core/field';
import { MoveAction } from 'engine/modules/movement';

export class MovementSystem extends System {
  override async processEvent(event: ECSEvent): Promise<void> {
    if (event instanceof ActionExecutingEvent && event.action instanceof MoveAction) {
      const action: MoveAction = event.action;
      FieldUtils.setFieldObjectPosition(event.executor, action.position);
    }
  }
}
