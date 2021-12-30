import type { TranslatableText } from '../../i18n/translatable-text';
export class Race {
  static readonly HUMAN = new Race('HUMAN');

  id: string;

  constructor(id: string) {
    this.id = id;
  }

  get name(): TranslatableText {
    return { translationKey: 'CHARACTER.RACE.' + this.id };
  }
}
