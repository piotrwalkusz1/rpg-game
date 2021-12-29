import { TranslatableRichText } from '../../common/model/TranslatableRichText';
export class Race {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  get name(): TranslatableRichText {
    return TranslatableRichText.fromTranslationKey('CHARACTER.RACE.' + this.id);
  }
}
