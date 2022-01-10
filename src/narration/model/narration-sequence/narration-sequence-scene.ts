import type { NarrationDescription } from '../narration-description';
import type { NarrationSequenceSceneAction } from './narration-sequence-scene-action';

export class NarrationSequenceScene {
  constructor(readonly description: NarrationDescription, readonly actions: NarrationSequenceSceneAction[]) {}
}
