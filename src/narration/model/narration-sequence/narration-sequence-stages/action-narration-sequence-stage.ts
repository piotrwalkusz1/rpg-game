import type { Action } from '../../../../action/model/actions/action';
import { ActionService } from '../../../../action/service/action-service';
import type { NarrationActionExecutionContext } from '../../narration-action-execution-context';
import { NarrationSequenceScene } from '../narration-sequence-scene';
import { NarrationSequenceSceneAction } from '../narration-sequence-scene-action';
import { NarrationSequenceStage } from '../narration-sequence-stage';
import type { NarrationSequenceStageExecutionResult } from '../narration-sequence-stage-execution-result';

export class ActionNarrationSequenceStage extends NarrationSequenceStage {
  constructor(readonly action: () => Action, readonly nextStage: () => NarrationSequenceStage | undefined) {
    super();
  }

  override execute(context: NarrationActionExecutionContext): NarrationSequenceStageExecutionResult {
    const result = ActionService.executeAction(this.action(), context);
    switch (result.type) {
      case 'SUCCESS':
        return { type: 'NEXT_STAGE', nextStage: this.nextStage() };
      case 'PREVENTION':
        return {
          type: 'SCENE',
          scene: new NarrationSequenceScene(result.description, [
            new NarrationSequenceSceneAction(
              () => ({ translationKey: 'NARRATION.COMMON.OK' }),
              () => this.nextStage()
            )
          ])
        };
    }
  }
}
