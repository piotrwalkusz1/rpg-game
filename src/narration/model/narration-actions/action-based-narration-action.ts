import type { Action } from '../../../action/model/actions/action';
import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { NarrationActionOrder } from '../narration-action-order';
import { NarrationSequence } from '../narration-sequence/narration-sequence';
import { ActionNarrationSequenceStage } from '../narration-sequence/narration-sequence-stages/action-narration-sequence-stage';
import { NarrationActionId, TemplateNarrationAction } from './template-narration-action';
import type { NarrationActionNameContext } from './narration-action-name-context';

export abstract class ActionBasedNarrationAction extends TemplateNarrationAction {
  constructor({
    id,
    nameTranslationProperties,
    nameContext,
    order,
    action
  }: {
    id: NarrationActionId;
    nameTranslationProperties?: Record<string, TranslatableText>;
    nameContext?: NarrationActionNameContext;
    order?: NarrationActionOrder;
    action: Action | ((gameState: GameState) => Action);
  }) {
    super({
      id,
      nameTranslationProperties,
      nameContext,
      order,
      narrationSequence: new NarrationSequence({ checkpointStages: [new ActionNarrationSequenceStage(action)] })
    });
  }
}
