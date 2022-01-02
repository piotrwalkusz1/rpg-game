import type { Action } from '../../../action/model/actions/action';
import { GoAction } from '../../../action/model/actions/go-action';
import type { MapField } from '../../../map/model/map-field';
import { FieldPosition } from '../../../map/model/position';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';
import type { NarrationActionId } from './template-narration-action';

export class GoToFieldNarrationAction extends ActionBasedNarrationAction {
  constructor(readonly field: MapField) {
    super();
  }

  override get id(): NarrationActionId {
    return 'GO_TO_FIELD';
  }

  override get order(): NarrationActionOrder {
    return NarrationActionOrder.GO_TO_FIELD;
  }

  override getAction(): Action {
    return new GoAction(new FieldPosition(this.field));
  }
}
