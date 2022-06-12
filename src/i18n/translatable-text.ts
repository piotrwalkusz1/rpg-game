import type { TType } from './translation-service';
import type { TranslationKey } from './translations';

const DEFAULT_SEPARATOR = '';

/* istanbul ignore next */
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
  | TranslationKey
  | { translationKey: TranslationKey; properties?: Record<string, TranslatableText> }
  | { literal: string }
  | ((tc: TranslationContext) => string);

/* istanbul ignore next */
export const convertTranslatableTextToString = (t: TType, translatableText: TranslatableText): string => {
  if (typeof translatableText === 'string') {
    return t(translatableText);
  } else if (typeof translatableText === 'function') {
    return translatableText(new TranslationContext(t));
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

/* istanbul ignore next */
export const createTranslatableTextFromArray = (translatableTexts: TranslatableText[], separator = DEFAULT_SEPARATOR): TranslatableText => {
  return (tc) => translatableTexts.map((translatableText) => tc.toString(translatableText)).join(separator);
};

export const isLiteral = (translatableText: TranslatableText, literal: string): boolean => {
  return typeof translatableText === 'object' && 'literal' in translatableText && translatableText.literal === literal;
};
