import { ActionExecutingEvent } from 'engine/core/action';
import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { InformAction } from 'engine/modules/information';
import { InformationOwner } from 'engine/modules/information/information-owner';

export class InformationSystem extends System {
  override async processEvent(event: ECSEvent, _engine: Engine): Promise<void> {
    if (event instanceof ActionExecutingEvent && event.action instanceof InformAction) {
      const informationReceiver: InformationOwner | undefined = event.action.informationReceiver.getComponent(InformationOwner);
      if (informationReceiver) {
        informationReceiver.addInformation(event.action.information);
      }
    }
  }
}
