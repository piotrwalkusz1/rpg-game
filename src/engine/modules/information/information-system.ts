import { ActionExecutingEvent } from 'engine/core/action';
import type { ECSEvent, Engine } from 'engine/core/ecs';
import { GameSystem } from 'engine/core/game';
import { InformAction } from 'engine/modules/information';

export class InformationSystem extends GameSystem {
  override async processEvent(event: ECSEvent, _engine: Engine): Promise<void> {
    if (event instanceof ActionExecutingEvent && event.action instanceof InformAction) {
      event.action.informationReceiver.addInformation(event.action.information);
    }
  }
}
