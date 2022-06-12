import { isLiteral } from 'i18n/translatable-text';
import type { TranslationKey } from 'i18n/translations';

describe('isLiteral', () => {
  it('should return true if values are equal', () => {
    expect(isLiteral({ literal: 'Hello world' }, 'Hello world')).toBe(true);
  });

  it('should return false if values are different', () => {
    expect(isLiteral({ literal: 'Hello world' }, 'Hello World')).toBe(false);
  });

  it('should return false if no literal', () => {
    expect(isLiteral('Hello world' as TranslationKey, 'Hello world')).toBe(false);
  });
});
