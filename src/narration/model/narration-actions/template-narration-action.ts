import type { TranslatableText } from '../../../i18n/translatable-text';
import { NarrationAction } from './narration-action';

export type NarrationActionId =
  | 'GO_TO_TERRAIN_OBJECT'
  | 'GO_TO_FIELD'
  | 'LEAVE_TERRAIN_OBJECT'
  | 'SEE_LOCATION'
  | 'CHANGE_TERRAIN_OBJECT_PLACEMENT'
  | 'ATTACK_CHARACTER';

export abstract class TemplateNarrationAction extends NarrationAction {
  abstract get id(): NarrationActionId;

  protected override getBaseName(): TranslatableText {
    return {
      translationKey: `NARRATION.ACTION.${this.id}`,
      properties: this.getNameTranslationKeyProperties()
    };
  }

  protected getNameTranslationKeyProperties(): Record<string, TranslatableText> | undefined {
    return undefined;
  }
}
