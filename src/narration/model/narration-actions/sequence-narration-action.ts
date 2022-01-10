import { NarrationService } from '../../service/narration-service';
import type { Narration } from '../narration';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import type { NarrationSequence } from '../narration-sequence/narration-sequence';
import type { NarrationSequenceStage } from '../narration-sequence/narration-sequence-stage';
import { NarrationAction } from './narration-action';

export abstract class SequenceNarrationAction extends NarrationAction {
  override execute(context: NarrationActionExecutionContext): Narration | undefined {
    const narrationSequence = this.getNarrationSequence();
    const narrationSequenceStage = this.getNarrationSequenceStages();
    return NarrationService.executeNarrationSequenceStages(narrationSequence, narrationSequenceStage, context);
  }

  protected getNarrationSequenceStages(): NarrationSequenceStage[] {
    return this.getNarrationSequence().checkpointStages;
  }

  protected abstract getNarrationSequence(): NarrationSequence;
}
