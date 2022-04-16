import type { MapLocation } from '../../../../map/model/map-location';
import type { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionParams } from '../narration-sequence-stage-execution-params';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class LocationViewNarrationSequenceStage implements NarrationSequenceStage {
  constructor(readonly location: MapLocation) {}

  execute({ context }: NarrationSequenceStageExecutionParams): NarrationSequenceStageExecutionResult {
    context.changeLocationView(this.location);
    return { type: 'NEXT_STAGE' };
  }
}
