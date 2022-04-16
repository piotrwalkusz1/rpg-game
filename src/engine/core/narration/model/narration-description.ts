import type { TranslatableText } from '../../../../i18n/translatable-text';
import type { Actor } from '../../actor/model/actor';

export class NarrationDescription {
  constructor(readonly text: TranslatableText, readonly character?: Actor) {}
}
