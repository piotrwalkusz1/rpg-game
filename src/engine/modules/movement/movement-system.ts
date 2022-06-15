import { ActionExecutingEvent } from 'engine/core/action';
import type { ECSEvent } from 'engine/core/ecs';
import { FieldUtils } from 'engine/core/field';
import { GameSystem } from 'engine/core/game';
import { MoveAction } from './move-action';

export class MovementSystem extends GameSystem {
  override async processEvent(event: ECSEvent): Promise<void> {
    if (event instanceof ActionExecutingEvent && event.action instanceof MoveAction) {
      const action: MoveAction = event.action;
      FieldUtils.setFieldObjectPosition(event.executor, action.position);
    }
  }
}
