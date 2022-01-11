import type { MapLocation } from '../../../../map/model/map-location';
import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionContext } from '../narration-sequence-stage-execution-context';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class LocationViewNarrationSequenceStage extends NarrationSequenceStage {
  constructor(readonly location: MapLocation) {
    super();
  }

  override execute(context: NarrationSequenceStageExecutionContext): NarrationSequenceStageExecutionResult {
    context.changeLocationView(this.location);
    return { type: 'NEXT_STAGE' };
  }
}
