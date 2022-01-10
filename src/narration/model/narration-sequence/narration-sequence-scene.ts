import type { NarrationDescription } from '../narration-description';
import type { NarrationSequenceSceneAction } from './narration-sequence-scene-action';

export class NarrationSequenceScene {
  readonly description: NarrationDescription;
  readonly actions: NarrationSequenceSceneAction[];

  constructor(description: NarrationDescription, actions?: NarrationSequenceSceneAction[]) {
    this.description = description;
    this.actions = actions || [];
  }
}
