import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapLocation } from '../../../map/model/map-location';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import { NarrationActionOrder } from '../narration-action-order';
import { NarrationAction, NarrationActionId } from './narration-action';

export class SeeLocationNarrationAction extends NarrationAction {
  constructor(readonly location: MapLocation) {
    super();
  }

  override get id(): NarrationActionId {
    return 'SEE_LOCATION';
  }

  override get order(): NarrationActionOrder {
    return NarrationActionOrder.SEE_LOCATION;
  }

  override execute(narrationActionExecutionContext: NarrationActionExecutionContext) {
    narrationActionExecutionContext.changeLocationView(this.location);
  }

  protected override getNameContext(): TranslatableText | undefined {
    return this.location.name;
  }
}
