import { GoAction } from '../../../action/model/actions/go-action';
import type { MapField } from '../../../map/model/map-field';
import { FieldPosition } from '../../../map/model/position';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';

export class GoToFieldNarrationAction extends ActionBasedNarrationAction {
  constructor(field: MapField) {
    super({
      id: 'GO_TO_FIELD',
      order: NarrationActionOrder.GO_TO_FIELD,
      action: new GoAction(new FieldPosition(field))
    });
  }
}
