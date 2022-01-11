import type { NarrationDescription } from '../narration-description';
import type { NarrationSequenceSceneAction } from './narration-sequence-scene-action';

export interface NarrationSequenceScene {
  description: NarrationDescription;
  actions?: NarrationSequenceSceneAction[];
}
