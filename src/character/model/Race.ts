export class Race {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  getTranslationKey(): string {
    return 'CHARACTER.RACE.' + this.id;
  }
}
