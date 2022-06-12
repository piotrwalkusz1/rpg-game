import { lerp } from 'utils';

describe('lerp', () => {
  it('should return first value if amount is 0', () => {
    expect(lerp(10, 100, 0)).toEqual(10);
  });

  it('should return second value if amount is 1', () => {
    expect(lerp(10, 100, 1)).toEqual(100);
  });

  it('should return average of the values if amount is 0.5', () => {
    expect(lerp(10, 100, 0.5)).toEqual(55);
  });
});
