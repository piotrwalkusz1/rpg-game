import type { MapField } from '../../map/model/map-field';
import { ActionTrigger } from './action-trigger';

export class MapFieldActionTrigger extends ActionTrigger {
  constructor(readonly field: MapField) {
    super();
  }
}
