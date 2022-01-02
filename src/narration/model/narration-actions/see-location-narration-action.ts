import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapLocation } from '../../../map/model/map-location';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import { NarrationActionOrder } from '../narration-action-order';
import { TemplateNarrationAction, NarrationActionId } from './template-narration-action';
import type { Narration } from '../narration';

export class SeeLocationNarrationAction extends TemplateNarrationAction {
  constructor(readonly location: MapLocation) {
    super();
  }

  override get id(): NarrationActionId {
    return 'SEE_LOCATION';
  }

  override get order(): NarrationActionOrder {
    return NarrationActionOrder.SEE_LOCATION;
  }

  override execute(narrationActionExecutionContext: NarrationActionExecutionContext): Narration | undefined {
    narrationActionExecutionContext.changeLocationView(this.location);
    return undefined;
  }

  protected override getNameContext(): TranslatableText | undefined {
    return this.location.name;
  }
}
