import type { TranslatableText } from '../../../i18n/translatable-text';
import type { NarrationActionOrder } from '../narration-action-order';
import type { NarrationSequence } from '../narration-sequence/narration-sequence';
import { NarrationAction } from './narration-action';

export type NarrationActionId =
  | 'GO_TO_TERRAIN_OBJECT'
  | 'GO_TO_FIELD'
  | 'LEAVE_TERRAIN_OBJECT'
  | 'SEE_LOCATION'
  | 'CHANGE_TERRAIN_OBJECT_PLACEMENT'
  | 'ATTACK_CHARACTER';

export abstract class TemplateNarrationAction extends NarrationAction {
  constructor({
    id,
    nameTranslationProperties,
    nameContext,
    order,
    narrationSequence
  }: {
    id: NarrationActionId;
    nameTranslationProperties?: Record<string, TranslatableText>;
    nameContext?: TranslatableText;
    order?: NarrationActionOrder;
    narrationSequence: NarrationSequence;
  }) {
    super({
      name: {
        translationKey: `NARRATION.ACTION.${id}`,
        properties: nameTranslationProperties
      },
      nameContext,
      order,
      narrationSequence
    });
  }
}
