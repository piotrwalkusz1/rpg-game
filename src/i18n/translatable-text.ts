import type { TType } from './translation-service';
import type { TranslationKey } from './translations';

export type TranslatableText =
  | TranslationKey
  | { translationKey: TranslationKey; properties?: Record<string, TranslatableText> }
  | { literal: string }
  | TranslatableText[];

/* istanbul ignore next */
export const convertTranslatableTextToString = (t: TType, translatableText: TranslatableText): string => {
  if (typeof translatableText === 'string') {
    return t(translatableText);
  } else if (Array.isArray(translatableText)) {
    return translatableText.map((text) => convertTranslatableTextToString(t, text)).join('');
  } else if ('literal' in translatableText) {
    return translatableText.literal;
  } else {
    const properties = translatableText.properties && convertTranslatableTextsToStringsOnObject(t, translatableText.properties);
    return t(translatableText.translationKey, properties);
  }
};

/* istanbul ignore next */
export const convertTranslatableTextsToStringsOnObject = (t: TType, object: Record<string, TranslatableText>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const key in object) {
    result[key] = convertTranslatableTextToString(t, object[key]);
  }
  return result;
};

export const isLiteral = (translatableText: TranslatableText, literal: string): boolean => {
  return typeof translatableText === 'object' && 'literal' in translatableText && translatableText.literal === literal;
};

/* istanbul ignore next */
export const wrapTranslation = (translatableText: TranslatableText, wrapper: string): TranslatableText => {
  return [{ literal: wrapper }, translatableText, { literal: wrapper }];
};
