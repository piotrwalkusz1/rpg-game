import type { NarrationActionExecutionContext } from '../narration-action-execution-context';
import type { NarrationSequence } from './narration-sequence';

export interface NarrationSequenceStageExecutionContext extends NarrationActionExecutionContext {
  narrationSequence: NarrationSequence;
}
