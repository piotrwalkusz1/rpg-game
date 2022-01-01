import type { TType } from './translation-service';
import type { TranslationKey } from './translations';

const DEFAULT_SEPARATOR = '';

class TranslationContext {
  constructor(private readonly t: TType) {}

  toString(translatableText: TranslatableText): string {
    return convertTranslatableTextToString(this.t, translatableText);
  }

  join(translatableTexts: TranslatableText[], separator: string = DEFAULT_SEPARATOR): string {
    return this.toString(createTranslatableTextFromArray(translatableTexts, separator));
  }
}

export type TranslatableText =
  | string
  | { translationKey: TranslationKey; properties?: Record<string, TranslatableText> }
  | ((tc: TranslationContext) => string);

export const convertTranslatableTextToString = (t: TType, translatableText: TranslatableText): string => {
  if (typeof translatableText === 'string') {
    return translatableText;
  } else if (typeof translatableText === 'object') {
    const properties = translatableText.properties && convertTranslatableTextsToStringsOnObject(t, translatableText.properties);
    return t(translatableText.translationKey, properties);
  } else {
    return translatableText(new TranslationContext(t));
  }
};

export const convertTranslatableTextsToStringsOnObject = (t: TType, object: Record<string, TranslatableText>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const key in object) {
    result[key] = convertTranslatableTextToString(t, object[key]);
  }
  return result;
};

export const createTranslatableTextFromArray = (translatableTexts: TranslatableText[], separator = DEFAULT_SEPARATOR): TranslatableText => {
  if (translatableTexts.every((translatableText) => typeof translatableText === 'string')) {
    return translatableTexts.join(separator);
  }
  return (tc) => translatableTexts.map((translatableText) => tc.toString(translatableText)).join(separator);
};
