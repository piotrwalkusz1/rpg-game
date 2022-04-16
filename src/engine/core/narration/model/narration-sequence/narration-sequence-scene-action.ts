import { NarrationAction } from '../narration-actions/narration-action';
import type { NarrationSequenceStage } from './narration-sequence-stage';

export type NarrationSequenceSceneAction = NarrationAction | ((nextNarrationStages: NarrationSequenceStage[]) => NarrationAction);

export namespace NarrationSequenceSceneAction {
  export const getNarrationActions = (
    narrationSceneActions: NarrationSequenceSceneAction[],
    nextNarrationStages: NarrationSequenceStage[]
  ): NarrationAction[] => {
    return narrationSceneActions.map((narrationSceneAction) => {
      if (narrationSceneAction instanceof NarrationAction) {
        return narrationSceneAction;
      } else {
        return narrationSceneAction(nextNarrationStages);
      }
    });
  };
}
