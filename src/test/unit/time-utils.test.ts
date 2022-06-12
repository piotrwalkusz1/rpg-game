import { sameTime } from 'engine/core/time/time-utils';
import { TimeUtils } from 'utils';

describe('sameTime', () => {
  it('should return true if both times are undefined', () => {
    expect(sameTime(undefined, undefined)).toBe(true);
  });
});

describe('TimeUtils', () => {
  describe('interpolate', () => {
    it('should return start date if ratio is 0', () => {
      expect(TimeUtils.interpolate(new Date(100), new Date(200), 0)).toEqual(new Date(100));
    });

    it('should return end date if ratio is 1', () => {
      expect(TimeUtils.interpolate(new Date(100), new Date(200), 1)).toEqual(new Date(200));
    });

    it('should return middle date if ratio is 0.5', () => {
      expect(TimeUtils.interpolate(new Date(100), new Date(200), 0.5)).toEqual(new Date(150));
    });
  });
});
