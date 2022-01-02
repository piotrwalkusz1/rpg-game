import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapLocation } from '../../../map/model/map-location';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import { NarrationActionExecutionResult } from '../narration-action-execution-result';
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

  override execute(narrationActionExecutionContext: NarrationActionExecutionContext): NarrationActionExecutionResult {
    narrationActionExecutionContext.changeLocationView(this.location);
    return NarrationActionExecutionResult.NEXT_NARRATION;
  }

  protected override getNameContext(): TranslatableText | undefined {
    return this.location.name;
  }
}
