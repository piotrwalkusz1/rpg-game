import { Health } from 'engine/modules/health';
import { OfferParty } from 'engine/modules/offer';
import { requireNotNull, requireNumber, requireType } from 'utils';

describe('requireType', () => {
  it('should throw error if different type', () => {
    expect(() => requireType(new OfferParty(), Health)).toThrow(new Error('Expected type "Health" but was OfferParty'));
  });
});

describe('requireNumber', () => {
  it('should return number if argument is number', () => {
    expect(requireNumber(47)).toEqual(47);
  });

  it('should throw error if argument is not number', () => {
    expect(() => requireNumber('47')).toThrow(new Error('Expected "number" but was string'));
  });
});

describe('requireNotNUll', () => {
  it('should throw error if undefined', () => {
    expect(() => requireNotNull(undefined)).toThrow(new Error('Expected not null but was undefined'));
  });
});
