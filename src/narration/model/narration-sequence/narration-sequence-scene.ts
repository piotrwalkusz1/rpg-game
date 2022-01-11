import type { NarrationAction } from '../narration-actions/narration-action';
import type { NarrationDescription } from '../narration-description';

export interface NarrationSequenceScene {
  description: NarrationDescription;
  actions?: NarrationAction[];
}
