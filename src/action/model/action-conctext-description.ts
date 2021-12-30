
import type { Character } from '../../character/model/character';
import type { TranslatableText } from '../../i18n/translatable-text';

export class ActionContextDescription {
  constructor(readonly text: TranslatableText, readonly character?: Character) {}
}
