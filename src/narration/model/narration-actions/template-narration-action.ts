import type { TranslatableText } from '../../../i18n/translatable-text';
import { NarrationAction } from './narration-action';

export type NarrationActionId =
  | 'GO_TO_TERRAIN_OBJECT'
  | 'GO_TO_FIELD'
  | 'LEAVE_TERRAIN_OBJECT'
  | 'SEE_LOCATION'
  | 'CHANGE_TERRAIN_OBJECT_PLACEMENT';

export abstract class TemplateNarrationAction extends NarrationAction {
  abstract get id(): NarrationActionId;

  override getName(): TranslatableText {
    const baseName: TranslatableText = {
      translationKey: `NARRATION.ACTION.${this.id}`,
      properties: this.getNameTranslationKeyProperties()
    };
    const nameContext = this.getNameContext();
    return nameContext ? (tc) => tc.join(['[', nameContext, '] ', baseName]) : baseName;
  }

  protected getNameContext(): TranslatableText | undefined {
    return undefined;
  }

  protected getNameTranslationKeyProperties(): Record<string, TranslatableText> | undefined {
    return undefined;
  }
}
