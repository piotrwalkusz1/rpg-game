import type { NarrationAction } from '../../narration/model/narration-actions/narration-action';

export abstract class Story {
  abstract getNarrationActions(): NarrationAction[];
}
