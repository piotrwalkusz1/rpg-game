import type { MapLocation } from '../../../map/model/map-location';
import { NarrationActionOrder } from '../narration-action-order';
import { NarrationSequence } from '../narration-sequence/narration-sequence';
import { LocationViewNarrationSequenceStage } from '../narration-sequence/narration-sequence-stages/location-view-narration-sequence-stage';
import { TemplateNarrationAction } from './template-narration-action';

export class SeeLocationNarrationAction extends TemplateNarrationAction {
  constructor(location: MapLocation) {
    super({
      id: 'SEE_LOCATION',
      nameContext: location,
      order: NarrationActionOrder.SEE_LOCATION,
      narrationSequence: new NarrationSequence({ checkpointStages: [new LocationViewNarrationSequenceStage(location)] })
    });
  }
}
