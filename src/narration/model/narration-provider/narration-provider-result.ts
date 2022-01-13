import type { TranslatableText } from '../../../i18n/translatable-text';
import type { NarrationAction } from '../narration-actions/narration-action';

export type NarrationProviderResult = {
  title?: { value: TranslatableText; order: number };
  descriptions?: { value: TranslatableText; order: number }[];
  actions?: NarrationAction[];
};
