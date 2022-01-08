import type { TranslatableText } from '../../../i18n/translatable-text';
import { CustomNarrationAction } from './custom-narration-action';

export class ExitNarrationAction extends CustomNarrationAction {
  constructor(name: TranslatableText) {
    super({ name });
  }
}
