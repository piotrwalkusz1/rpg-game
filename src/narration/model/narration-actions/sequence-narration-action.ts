import { NarrationService } from '../../service/narration-service';
import type { Narration } from '../narration';
import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import type { NarrationSequence } from '../narration-sequence/narration-sequence';
import type { NarrationSequenceStage } from '../narration-sequence/narration-sequence-stage';
import { NarrationAction } from './narration-action';

export abstract class SequenceNarrationAction extends NarrationAction {
  override execute(context: NarrationActionExecutionContext): Narration | undefined {
    const narrationSequence = this.getNarrationSequence();
    const narrationSequenceStage = this.getNarrationSequenceStage();
    return NarrationService.executeNarrationSequenceStage(narrationSequence, narrationSequenceStage, context);
  }

  protected getNarrationSequenceStage(): NarrationSequenceStage {
    return this.getNarrationSequence().checkpointStage;
  }

  protected abstract getNarrationSequence(): NarrationSequence;
}
