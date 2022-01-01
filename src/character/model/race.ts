import type { TranslatableText } from '../../i18n/translatable-text';

export type RaceId = `HUMAN`;

export class Race {
  static readonly HUMAN = new Race('HUMAN');

  id: RaceId;

  constructor(id: RaceId) {
    this.id = id;
  }

  get name(): TranslatableText {
    return { translationKey: `CHARACTER.RACE.${this.id}` };
  }
}
