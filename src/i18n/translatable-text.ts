import type { TType } from './translation-service';

const DEFAULT_SEPARATOR = ' ';

export type TranslatableText = string | { translationKey: string; properties?: { [key: string]: unknown } } | ((t: TType) => string);

export const convertTranslatableTextToString = (t: TType, translatableText: TranslatableText): string => {
  if (typeof translatableText === 'string') {
    return translatableText;
  } else if (typeof translatableText === 'object') {
    return t(translatableText.translationKey, translatableText.properties);
  } else {
    return translatableText(t);
  }
};

export const createTranslatableTextFromArray = (translatableTexts: TranslatableText[]): TranslatableText => {
  if (translatableTexts.every((translatableText) => typeof translatableText === 'string')) {
    return translatableTexts.join(DEFAULT_SEPARATOR);
  }

  return (t) => translatableTexts.map((translatableText) => convertTranslatableTextToString(t, translatableText)).join(DEFAULT_SEPARATOR);
};
