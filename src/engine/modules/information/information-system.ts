import { ActionExecutingEvent } from 'engine/core/action';
import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { InformAction } from 'engine/modules/information';

export class InformationSystem extends System {
  override async processEvent(event: ECSEvent, _engine: Engine): Promise<void> {
    if (event instanceof ActionExecutingEvent && event.action instanceof InformAction) {
      event.action.informationReceiver.addInformation(event.action.information);
    }
  }
}
