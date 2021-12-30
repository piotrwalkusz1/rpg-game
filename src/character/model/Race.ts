import { TranslatableRichText } from '../../common/model/TranslatableRichText';
export class Race {
  static readonly HUMAN = new Race('HUMAN');

  id: string;

  constructor(id: string) {
    this.id = id;
  }

  get name(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('CHARACTER.RACE.' + this.id);
  }
}
