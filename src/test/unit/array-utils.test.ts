import { ArrayUtils } from 'utils';

describe('ArrayUtils', () => {
  describe('removeFirst', () => {
    it('should return true if item removed', () => {
      expect(ArrayUtils.removeFirst([1, 3, 10], 3)).toBe(true);
    });

    it('should return false if item not found', () => {
      expect(ArrayUtils.removeFirst([1, 3, 10], 4)).toBe(false);
    });
  });

  describe('distinct', () => {
    it('should return array with unique values', () => {
      expect(ArrayUtils.distinct([5, 5, 1, 6, 1])).toEqual([5, 1, 6]);
    });
  });
});
