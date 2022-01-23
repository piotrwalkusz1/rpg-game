import { getContext, setContext } from 'svelte';
import { derived, Readable, Writable, writable } from 'svelte/store';
import { I18nService } from './i18n-service';

export type TType = (text: string, replacements?: Record<string, string>) => string;

export interface TranslationService {
  locale: Writable<string>;
  translate: Readable<TType>;
}

export class I18NextTranslationService implements TranslationService {
  public locale: Writable<string>;
  public translate: Readable<TType>;

  constructor(i18n: I18nService) {
    i18n.initialize().then(
      () => {
        /* Do nothing */
      },
      () => {
        /* Do nothing */
      }
    );
    this.locale = this.createLocale(i18n);
    this.translate = this.createTranslate(i18n);
  }

  // Locale initialization.
  // 1. Create a writable store
  // 2. Create a new set function that changes the i18n locale.
  // 3. Create a new update function that changes the i18n locale.
  // 4. Return modified writable.
  private createLocale(i18n: I18nService) {
    const { subscribe, set, update } = writable<string>(i18n.i18n.language);

    const setLocale = (newLocale: string) => {
      i18n.changeLanguage(newLocale).then(
        () => {
          /* Do nothing */
        },
        () => {
          /* Do nothing */
        }
      );
      set(newLocale);
    };

    const updateLocale = (updater: (value: string) => string) => {
      update((currentValue) => {
        const nextLocale = updater(currentValue);
        i18n.changeLanguage(nextLocale).then(
          () => {
            /* Do nothing */
          },
          () => {
            /* Do nothing */
          }
        );
        return nextLocale;
      });
    };

    return {
      subscribe,
      update: updateLocale,
      set: setLocale
    };
  }

  // Create a translate function.
  // It is derived from the "locale" writable.
  // This means it will be updated every time the locale changes.
  private createTranslate(i18n: I18nService) {
    return derived([this.locale], () => {
      return (key: string, replacements?: Record<string, unknown>) => i18n.t(key, replacements);
    });
  }
}

export const initLocalizationContext = () => {
  // Initialize our services
  const i18n = new I18nService();
  const tranlator = new I18NextTranslationService(i18n);

  // Setting the Svelte context
  setLocalization({
    t: tranlator.translate,
    currentLanguage: tranlator.locale
  });

  return {
    i18n
  };
};

const CONTEXT_KEY = 't';

export type I18nContext = {
  t: Readable<TType>;
  currentLanguage: Writable<string>;
};

export const setLocalization = (context: I18nContext) => {
  return setContext<I18nContext>(CONTEXT_KEY, context);
};

export const getLocalization = () => {
  return getContext<I18nContext>(CONTEXT_KEY);
};
