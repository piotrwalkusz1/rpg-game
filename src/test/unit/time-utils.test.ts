import { sameTime } from 'engine/core/time/time-utils';

describe('sameTime', () => {
  it('should return true if both times are undefined', () => {
    expect(sameTime(undefined, undefined)).toBe(true);
  });
});
