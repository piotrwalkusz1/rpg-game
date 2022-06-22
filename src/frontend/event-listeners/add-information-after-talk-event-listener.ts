import { EntityEventListener } from 'engine/core/ecs';
import type { Information } from 'engine/modules/information';

export class AddInformationAfterTalkEventListener extends EntityEventListener {
  constructor(readonly information: Information) {
    super();
  }
}
