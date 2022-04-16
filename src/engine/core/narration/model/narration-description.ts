import type { TranslatableText } from '../../../../i18n/translatable-text';
import type { Character } from '../../character/model/character';

export class NarrationDescription {
  constructor(readonly text: TranslatableText, readonly character?: Character) {}
}
