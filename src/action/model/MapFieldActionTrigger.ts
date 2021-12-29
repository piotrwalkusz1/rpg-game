import { MapField } from '../../map/model/MapField';
import { ActionTrigger } from './ActionTrigger';

export class MapFieldActionTrigger extends ActionTrigger {
  constructor(readonly field: MapField) {
    super();
  }
}
