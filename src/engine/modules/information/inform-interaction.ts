import type { Information, InformationOwner } from 'engine/modules/information';
import { Interaction } from '../interaction';

export class InformInteraction extends Interaction {
  readonly informationReceiver: InformationOwner;
  readonly information: Information;

  constructor({ informationReceiver, information }: { informationReceiver: InformationOwner; information: Information }) {
    super();
    this.informationReceiver = informationReceiver;
    this.information = information;
  }
}
